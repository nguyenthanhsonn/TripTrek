import { useState, useCallback } from "react";

export type Notification = {
  id: string | number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  bookingId?: number;
  tourId?: number;
};

export default function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications");
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data: Notification[] = await res.json();
      setNotifications(data || []);
    } catch (err) {
      console.error("fetchNotifications error:", err);
    }
  }, []);

  const markAsRead = useCallback(async (id: string | number) => {
    try {
      // endpoint example: POST /api/notifications/:id/read
      const res = await fetch(`/api/notifications/${id}/read`, {
        method: "POST",
      });
      if (!res.ok) throw new Error(`Mark as read failed: ${res.status}`);

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("markAsRead error:", err);
    }
  }, []);

  return { notifications, unreadCount, fetchNotifications, markAsRead };
}