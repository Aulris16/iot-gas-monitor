#ifndef CONFIG_H
#define CONFIG_H

// ─── WiFi ────────────────────────────────────────────────────────────────────
#define WIFI_SSID     "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

// ─── MQTT Broker ─────────────────────────────────────────────────────────────
#define MQTT_BROKER   "broker.emqx.io"
#define MQTT_PORT     1883
#define MQTT_CLIENT_ID "esp8266-gas-monitor"
#define MQTT_TOPIC    "gas/telemetry"

// ─── Hardware Pins ───────────────────────────────────────────────────────────
#define MQ2_PIN       A0   // MQ2 analog output → ESP8266 A0

// ─── Gas Threshold ───────────────────────────────────────────────────────────
#define GAS_DANGER_THRESHOLD 500   // ppm >= 500 → DANGER

// ─── Timing ──────────────────────────────────────────────────────────────────
#define PUBLISH_INTERVAL_MS 2000  // Publish every 2 seconds

#endif
