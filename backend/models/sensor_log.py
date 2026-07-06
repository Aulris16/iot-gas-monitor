from datetime import datetime
from app import db


class SensorLog(db.Model):
    __tablename__ = "sensor_log"

    id = db.Column(db.Integer, primary_key=True)
    gas_value = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.now,
    )

    def __repr__(self):
        return f"<SensorLog id={self.id} gas_value={self.gas_value} status={self.status}>"
