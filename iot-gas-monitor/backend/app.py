from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from config import Config

# Initialize extensions (without binding to an app yet)
db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    CORS(app, origins=app.config["CORS_ORIGINS"])

    # Register blueprints
    from routes import register_routes
    register_routes(app)

    # Create database tables (only if they don't exist yet)
    with app.app_context():
        db.create_all()

    return app
