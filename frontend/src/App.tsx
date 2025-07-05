import Dashboard from "./components/dashboard";
import Controls from "./components/controls";
import Notifications from "./components/notifications";

function App() {
  return (
    <div className="container mx-auto p-4">
      <Dashboard />
      <Controls />
      <Notifications />
    </div>
  );
}

export default App;
