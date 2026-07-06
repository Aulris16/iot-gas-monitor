import json
from flask import Blueprint, jsonify, request
from mqtt import mqtt_client, TOPIC_COMMAND

command_bp = Blueprint("command", __name__)

VALID_COMMANDS = {"ENABLE_ALARM", "DISABLE_ALARM"}


@command_bp.route("/command", methods=["POST"])
def send_command():
    """Validate and publish a device command to MQTT."""
    data = request.get_json(silent=True)

    if not data or "command" not in data:
        return jsonify({"success": False, "error": "Missing 'command' field."}), 400

    command = data["command"]

    if command not in VALID_COMMANDS:
        return jsonify({
            "success": False,
            "error": f"Unknown command '{command}'. Valid commands: {sorted(VALID_COMMANDS)}",
        }), 400

    if mqtt_client is None or not mqtt_client.is_connected():
        return jsonify({"success": False, "error": "MQTT broker not connected."}), 503

    payload = json.dumps({"command": command})
    mqtt_client.publish(TOPIC_COMMAND, payload)

    print(f"[CMD] Published to {TOPIC_COMMAND}: {payload}")

    return jsonify({"success": True, "command": command}), 200
