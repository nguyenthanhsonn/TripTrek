"use client";

import { useState } from "react";
import { useNotificationContext } from "../context/NotificationSocketContext";
import NotificationBell from "./NotificationBell";
import { useRouter } from "next/navigation";

export default function NotificationDropdown() {
    const { notifications, markAsRead } = useNotificationContext();
    const [open, setOpen] = useState(false);
    const shake = notifications.some((n) => !n.isRead);
    const router = useRouter();

    const formatDate = (date: string) => {
        if (!date) return "—";
        const d = new Date(date);
        if (isNaN(d.getTime())) return "—";
        return d.toLocaleString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    // 👉 FUNCTION xử lý điều hướng
    const handleRedirect = (n: any) => {
        markAsRead(n.id);

        switch (n.typeNoti) {
            case "NEW_BOOKING":
                // seller nhận thông báo khách đặt tour → đi đến bookingManage
                router.push("/dashboard/tourSelling/bookingManage");
                break;

            case "TOUR_REJECTED":
                // seller nhận thông báo khách tự hủy tour → cũng tới bookingManage
                router.push("/dashboard/tourSelling/bookingManage");
                break;

            case "BOOKING_STATUS":
                // buyer nhận thông báo seller duyệt/ từ chối → tới vé đã đặt
                router.push("/dashboard/tourStore");
                break;

            default:
                // fallback nếu có typeNoti lạ
                router.push("/dashboard/tourStore");
        }

        setOpen(false);
    };


    return (
        <div className="relative">
            <NotificationBell onClick={() => setOpen(!open)} shake={shake} />

            {open && (
                <div className="absolute right-0 top-10 w-80 bg-white shadow-xl rounded-lg p-3 border z-50">
                    <h3 className="font-semibold mb-2 text-black">Thông báo</h3>

                    {notifications.length === 0 && (
                        <p className="text-gray-600 text-sm">Không có thông báo</p>
                    )}

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.map((n) => (
                            <div
                                key={n.id}
                                onClick={() => handleRedirect(n)}
                                className={`p-3 border-b last:border-none cursor-pointer rounded transition 
                                    ${!n.isRead
                                        ? "bg-blue-100 hover:bg-blue-200"
                                        : "hover:bg-gray-100"
                                    }
                                `}
                            >
                                <p className="font-bold text-black">{n.title}</p>
                                <p className="text-sm text-black">{n.message}</p>
                                <p className="text-gray-500 text-sm mt-2">
                                    {formatDate(n.createdAt)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
