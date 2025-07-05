import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socket from "../api/socket";

export default function Notifications() {
  useEffect(() => {
    socket.on("notification", (msg: string) => {
      toast.warn(msg);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return <ToastContainer />;
}
