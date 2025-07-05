import socket from "../api/socket";

export default function Controls() {
  const handleWater = (on: boolean) => {
    socket.emit("control-water", on ? "ON" : "OFF");
  };

  return (
    <div className="p-4 mt-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">Manual Controls</h2>
      <button
        onClick={() => handleWater(true)}
        className="px-4 py-2 bg-green-500 text-white rounded mr-2"
      >
        Start Watering
      </button>
      <button
        onClick={() => handleWater(false)}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Stop Watering
      </button>
    </div>
  );
}
