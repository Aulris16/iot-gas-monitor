import json
import paho.mqtt.client as mqtt

BROKER_HOST = "broker.emqx.io"
BROKER_PORT = 1883
TOPIC = "gas/telemetry"
TOPIC_COMMAND = "gas/command"

# Exposed so routes can publish commands
mqtt_client = None


def on_connect(client, userdata, flags, reason_code, properties):
    """Called when the client connects to the broker."""
    if reason_code == 0:
        print(f"[MQTT] Connected to {BROKER_HOST}:{BROKER_PORT}")
        client.subscribe(TOPIC)
        print(f"[MQTT] Subscribed to topic: {TOPIC}")
    else:
        print(f"[MQTT] Connection failed. Reason code: {reason_code}")


def on_disconnect(client, userdata, disconnect_flags, reason_code, properties):
    """Called when the client disconnects from the broker."""
    print(f"[MQTT] Disconnected. Reason code: {reason_code}. Reconnecting...")


def on_message(client, userdata, msg):
    """
    Called every time a message is received on a subscribed topic.
    userdata holds the Flask app instance so we can open an app context.
    """
    flask_app = userdata

    try:
        payload = json.loads(msg.payload.decode("utf-8"))
        print(f"[MQTT] Message received on '{msg.topic}':")
        print(json.dumps(payload, indent=2))
    except json.JSONDecodeError:
        print(f"[MQTT] Non-JSON payload received: {msg.payload}")
        return

    # Validate required fields
    if "ppm" not in payload or "status" not in payload:
        print("[MQTT] Missing 'ppm' or 'status' field. Skipping.")
        return

    # Save to database inside a Flask app context
    with flask_app.app_context():
        from app import db
        from models.sensor_log import SensorLog

        log = SensorLog(
            gas_value=int(payload["ppm"]),
            status=str(payload["status"]),
        )
        db.session.add(log)
        db.session.commit()
        print(f"[MQTT] Saved to database: id={log.id} gas_value={log.gas_value} status={log.status}")


def start_mqtt(flask_app):
    """
    Create and start the MQTT client in a background daemon thread.
    flask_app is stored as userdata so on_message can open an app context.
    """
    global mqtt_client
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, userdata=flask_app)
    mqtt_client = client

    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.on_message = on_message

    # reconnect_delay_set: wait 1s before first retry, max 30s between retries
    client.reconnect_delay_set(min_delay=1, max_delay=30)

    client.connect(BROKER_HOST, BROKER_PORT, keepalive=60)

    # loop_start() runs the network loop in a background thread automatically
    client.loop_start()

    print("[MQTT] Client started in background thread.")
