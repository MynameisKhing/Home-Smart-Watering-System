require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mqtt = require("mqtt");
const { insertData, getHistory } = require("./db");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow frontend dev
  },
});

const MQTT_BROKER = process.env.MQTT_BROKER;
const PORT = process.env.PORT || 3000;

// ประกาศตรงนี้ก่อน
const mqttClient = mqtt.connect(MQTT_BROKER);

mqttClient.on("connect", () => {
  console.log("Connected to MQTT Broker");
  mqttClient.subscribe("sensor/#");
});

mqttClient.on("message", (topic, message) => {
  const value = parseFloat(message.toString());
  const time = new Date().toISOString();

  console.log(`[MQTT] ${topic}: ${value}`);
  io.emit("sensor-data", { topic, value });

  insertData(topic, value, time);

  if (topic === "sensor/tds" && value > 500) {
    io.emit("notification", `TDS สูงเกิน: ${value}`);
  }
});

io.on("connection", (socket) => {
  console.log("Frontend connected");

  socket.on("control-water", (cmd) => {
    console.log(`Control command: ${cmd}`);
    mqttClient.publish("actuator/water_pump", cmd);
  });
});

app.get("/api/history", (req, res) => {
  const history = getHistory(100);
  res.json(history);
});

server.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
