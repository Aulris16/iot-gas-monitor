from flask import Blueprint, jsonify
from models.sensor_log import SensorLog

sensor_bp = Blueprint("sensor", __name__)


@sensor_bp.route("/latest", methods=["GET"])
def get_latest():
    """Return the most recent SensorLog record."""
    log = SensorLog.query.order_by(SensorLog.created_at.desc()).first()

    if log is None:
        return jsonify({"message": "No data available yet."}), 404

    return jsonify({
        "gas_value": log.gas_value,
        "status": log.status,
        "created_at": log.created_at.isoformat(),
    }), 200


@sensor_bp.route("/history", methods=["GET"])
def get_history():
    """Return the latest 50 SensorLog records, newest first."""
    logs = (
        SensorLog.query
        .order_by(SensorLog.created_at.desc())
        .limit(50)
        .all()
    )

    result = [
        {
            "gas_value": log.gas_value,
            "status": log.status,
            "created_at": log.created_at.isoformat(),
        }
        for log in logs
    ]

    return jsonify(result), 200
