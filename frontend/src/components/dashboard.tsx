import { useEffect, useState } from "react";
import socket from "../api/socket";

interface SensorData {
  topic: string;
  value: number;
}

export default function Dashboard() {
  const [data, setData] = useState<Record<string, number>>({});

  useEffect(() => {
    socket.on("sensor-data", (msg: SensorData) => {
      setData((prev) => ({ ...prev, [msg.topic]: msg.value }));
    });

    return () => {
      socket.off("sensor-data");
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🌱 Smart Watering Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(data).map(([topic, value]) => (
          <div key={topic} className="p-4 border rounded shadow">
            <p className="font-semibold">{topic}</p>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
