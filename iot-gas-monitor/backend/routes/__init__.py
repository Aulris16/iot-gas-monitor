from flask import Blueprint, jsonify

# Health check blueprint
health_bp = Blueprint("health", __name__)


@health_bp.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "Gas Monitor API is running"}), 200


def register_routes(app):
    """Register all blueprints here."""
    app.register_blueprint(health_bp, url_prefix="/api")
    # Future blueprints will be registered here, e.g.:
    # from routes.readings import readings_bp
    # app.register_blueprint(readings_bp, url_prefix="/api")
