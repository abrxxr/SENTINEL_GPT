import uuid

class AlertManager:
    def __init__(self):
        self.alerts = []

    def create_alert(self, title: str, description: str, severity: str, icon: str = "🚨") -> dict:
        alert = {
            "id": f"alrt_{uuid.uuid4().hex[:8]}",
            "severity": severity,
            "title": title,
            "description": description,
            "time": "Just now",
            "acknowledged": False,
            "icon": icon
        }
        self.alerts.append(alert)
        return alert

    def acknowledge_alert(self, alert_id: str) -> bool:
        for alert in self.alerts:
            if alert["id"] == alert_id:
                alert["acknowledged"] = True
                return True
        return False

    def get_active_alerts(self):
        return [a for a in self.alerts if not a["acknowledged"]]
