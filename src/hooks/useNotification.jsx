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
        console.error("Error: User not logged in");
        return;
      }

      console.log("Fetching notifications from API:", APIUSERNOTIFICATION);
      console.log("Using token:", token);

      try {
        const response = await fetch(APIUSERNOTIFICATION, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Raw API Response:", response);

        if (response.ok) {
          const data = await response.json();
          console.log("Parsed API Data:", data);

          if (Array.isArray(data.data)) {
            console.log("Notifications found:", data.data);
            // Sort notifications by 'created_at' or equivalent timestamp field
            const sortedNotifications = data.data.sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            setNotifications(sortedNotifications); // Update notifications
            localStorage.setItem(
              "cachedNotifications",
              JSON.stringify(sortedNotifications)
            ); // Cache the notifications
          } else {
            console.error("Unexpected API response structure:", data);
          }
        } else {
          console.error(
            `Failed to fetch notifications. Status: ${response.status}, Status Text: ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [APIUSERNOTIFICATION]);

  return { notifications };
};
