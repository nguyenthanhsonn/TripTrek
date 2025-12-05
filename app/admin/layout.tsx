"use client";

import AdminNavbar from "./AdminNavbar";
import { NotificationSocketProvider } from "@/app/context/NotificationSocketContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <NotificationSocketProvider>
            <AdminNavbar />
            {children}
        </NotificationSocketProvider>

    );
}
