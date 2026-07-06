import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    # Flask
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
    DEBUG = os.getenv("FLASK_DEBUG", "0") == "1"

    # Database
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///gas_monitor.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # CORS — use FRONTEND_URL on Render, CORS_ORIGINS locally
    CORS_ORIGINS = (
        os.getenv("FRONTEND_URL")
        or os.getenv("CORS_ORIGINS", "http://localhost:5173")
    )

    # MQTT
    MQTT_BROKER_HOST = os.getenv("MQTT_BROKER_HOST", "localhost")
    MQTT_BROKER_PORT = int(os.getenv("MQTT_BROKER_PORT", "1883"))
    MQTT_TOPIC_TELEMETRY = os.getenv("MQTT_TOPIC_TELEMETRY", "gas/telemetry")
    MQTT_TOPIC_COMMANDS = os.getenv("MQTT_TOPIC_COMMANDS", "gas/commands")
