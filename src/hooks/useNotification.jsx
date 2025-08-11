import { useEffect, useState } from "react";
import { APIURLS } from "../components/Constants";

export const useNotification = () => {
  const [notifications, setNotifications] = useState(() => {
    const cachedNotifications = localStorage.getItem("cachedNotifications");
    return cachedNotifications ? JSON.parse(cachedNotifications) : [];
  });

  const APIUSERNOTIFICATION = APIURLS.APIUSERNOTIFICATION;

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const response = await fetch(APIUSERNOTIFICATION, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          if (Array.isArray(data.data)) {
            const sortedNotifications = data.data.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            setNotifications(sortedNotifications); // Update notifications
            localStorage.setItem(
              "cachedNotifications",
              JSON.stringify(sortedNotifications)
            ); 
          } 
        } 
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [APIUSERNOTIFICATION]);

  return { notifications };
};
