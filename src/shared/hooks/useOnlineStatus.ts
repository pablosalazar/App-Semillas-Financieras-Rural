import { useState, useEffect } from "react";
import { Network } from "@capacitor/network";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true); // optimistic default

  useEffect(() => {
    // Get the initial state using native API
    Network.getStatus().then((status) => {
      setIsOnline(status.connected);
    });

    // Listen for native network status changes
    const listener = Network.addListener("networkStatusChange", (status) => {
      setIsOnline(status.connected);
    });

    return () => {
      listener.then((handle) => handle.remove());
    };
  }, []);

  return isOnline;
}
