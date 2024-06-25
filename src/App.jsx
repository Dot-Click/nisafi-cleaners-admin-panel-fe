import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routers/Router";
import { useEffect } from "react";
import { useDashboardStore } from "./stores/dashboardStore";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "./stores/authStore";
import { successMessage } from "./services/helpers";

function App() {
  const { handleNotificationCount, unReadCount, fetchUnreadCount } =
    useDashboardStore(useShallow((state) => state));

  const { isAuthenticated, socket, user } = useAuthStore(
    useShallow((state) => state)
  );

  useEffect(() => {
    if (isAuthenticated && user) {
      socket.emit("join", user?.userData?._id);
      socket.on("reconnect", () => {
        if (isAuthenticated) {
          socket.emit("join", user?.userData?._id);
        }
      });
    }
    socket.on("notification", (notification) => {
      if (user?.userData?.role === "admin") {
        successMessage("Notification received!");
        handleNotificationCount();

        if (Notification.permission === "granted") {
          new Notification(notification.title, {
            body: notification.message,
          });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              new Notification(notification.title, {
                body: notification.message,
              });
            }
          });
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated]);

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
