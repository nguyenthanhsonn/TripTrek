"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

interface Notification {
    id: number;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    tourId?: number;
    bookingId?: number;
    typeNoti?: string;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    markAsRead: (id: number) => Promise<void>;
}

const NotificationSocketContext = createContext<NotificationContextType | null>(null);

export function NotificationSocketProvider({ children }: { children: React.ReactNode }) {
    const { getToken } = useAuth();

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [userPayload, setUserPayload] = useState<any>(null);

    const socketRef = useRef<Socket | null>(null);

    // ----------------------------------------------------
    // 1️⃣ LẤY PAYLOAD TỪ TOKEN (chỉ chạy 1 lần)
    // ----------------------------------------------------
    useEffect(() => {
        const token = getToken();
        if (!token) return;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUserPayload(payload);
        } catch (err) {
            console.log("❌ Decode token failed:", err);
        }
    }, []); // ONLY RUN ONCE


    // ----------------------------------------------------
    // 2️⃣ FETCH THÔNG BÁO (chỉ chạy 1 lần khi userPayload load)
    // ----------------------------------------------------
    const fetchNotifications = async () => {
        const token = getToken();
        if (!token) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            setNotifications(Array.isArray(data) ? data : []);
        } catch (err) {
            console.log("❌ Fetch notifications failed:", err);
        }
    };

    useEffect(() => {
        if (userPayload) {
            fetchNotifications();
        }
    }, [userPayload]); // ONLY RUN WHEN PAYLOAD EXISTS


    // ----------------------------------------------------
    // 3️⃣ SOCKET — CHỈ KẾT NỐI 1 LẦN
    // ----------------------------------------------------
    useEffect(() => {
    if (!userPayload) return;

    const token = getToken();
    if (!token) return;

    const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/notification`, {
        transports: ["websocket"],
        auth: { token },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
        console.log("⚡ SOCKET CONNECTED:", socket.id);

        const payload = userPayload;

        const isAdmin =
            payload?.is_admin === true ||
            payload?.role === "admin" ||
            payload?.user?.is_admin === true;

        if (isAdmin) {
            socket.emit("join-admin-room");
        }
    });

    socket.on("new-notification", (data) => {
        setNotifications(prev => [data, ...(Array.isArray(prev) ? prev : [])]);
        toast.success(data.title);
    });

    socket.on("new-notification-admin", (data) => {
        setNotifications(prev => [data, ...(Array.isArray(prev) ? prev : [])]);
        toast.success(`📢 ADMIN: ${data.title}`);
    });

    // ✅ CLEANUP FUNCTION — FIXED
    return () => {
        console.log("🔌 SOCKET DISCONNECTED");
        socket.disconnect();   // ❗ Không được return socket
    };

}, [userPayload]);



    // ----------------------------------------------------
    // 4️⃣ MARK AS READ
    // ----------------------------------------------------
    const markAsRead = async (id: number) => {
        const token = getToken();
        if (!token) return;

        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}/read`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
            });

            setNotifications(prev =>
                prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
            );
        } catch (err) {
            console.log("❌ Mark as read failed:", err);
        }
    };

    // ----------------------------------------------------
    // 5️⃣ unreadCount SAFE
    // ----------------------------------------------------
    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <NotificationSocketContext.Provider value={{ notifications, unreadCount, markAsRead }}>
            {children}
        </NotificationSocketContext.Provider>
    );
}

export function useNotificationContext() {
    const ctx = useContext(NotificationSocketContext);
    if (!ctx) throw new Error("useNotificationContext must be used inside NotificationSocketProvider");
    return ctx;
}
