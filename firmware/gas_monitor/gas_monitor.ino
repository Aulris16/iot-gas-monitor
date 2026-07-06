#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "config.h"

// ─── Globals ─────────────────────────────────────────────────────────────────
WiFiClient   wifiClient;
PubSubClient mqttClient(wifiClient);

unsigned long lastPublishTime = 0;

// ─── WiFi ─────────────────────────────────────────────────────────────────────
void connectWiFi() {
  Serial.print("[WiFi] Connecting to ");
  Serial.println(WIFI_SSID);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("[WiFi] Connected. IP: ");
  Serial.println(WiFi.localIP());
}

// ─── MQTT ─────────────────────────────────────────────────────────────────────
void connectMQTT() {
  while (!mqttClient.connected()) {
    Serial.print("[MQTT] Connecting to ");
    Serial.print(MQTT_BROKER);
    Serial.print("...");

    if (mqttClient.connect(MQTT_CLIENT_ID)) {
      Serial.println(" connected.");
    } else {
      Serial.print(" failed. State=");
      Serial.print(mqttClient.state());
      Serial.println(" — retrying in 3s.");
      delay(3000);
    }
  }
}

// ─── Sensor ───────────────────────────────────────────────────────────────────
int readGasPPM() {
  // A0 returns 0–1023. Map to a rough ppm range (0–1000).
  int raw = analogRead(MQ2_PIN);
  int ppm = map(raw, 0, 1023, 0, 1000);
  return ppm;
}

// ─── Publish ──────────────────────────────────────────────────────────────────
void publishTelemetry() {
  int ppm = readGasPPM();
  const char* status = (ppm >= GAS_DANGER_THRESHOLD) ? "DANGER" : "SAFE";

  // Build JSON payload
  StaticJsonDocument<64> doc;
  doc["ppm"]    = ppm;
  doc["status"] = status;

  char payload[64];
  serializeJson(doc, payload);

  bool ok = mqttClient.publish(MQTT_TOPIC, payload);

  Serial.print("[MQTT] Published → ");
  Serial.print(MQTT_TOPIC);
  Serial.print(" | ");
  Serial.print(payload);
  Serial.println(ok ? " ✓" : " ✗ (failed)");
}

// ─── Setup ────────────────────────────────────────────────────────────────────
void setup() {
  Serial.begin(115200);
  delay(100);

  Serial.println("\n[Boot] Gas Monitor starting...");

  connectWiFi();

  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);
}

// ─── Loop ─────────────────────────────────────────────────────────────────────
void loop() {
  // Reconnect WiFi if dropped
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[WiFi] Disconnected — reconnecting...");
    connectWiFi();
  }

  // Reconnect MQTT if dropped
  if (!mqttClient.connected()) {
    connectMQTT();
  }

  // Must be called to maintain the MQTT connection
  mqttClient.loop();

  // Publish every PUBLISH_INTERVAL_MS milliseconds
  unsigned long now = millis();
  if (now - lastPublishTime >= PUBLISH_INTERVAL_MS) {
    lastPublishTime = now;
    publishTelemetry();
  }
}
