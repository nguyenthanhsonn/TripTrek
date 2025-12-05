"use client";

import { useEffect } from "react";
import useNotification from "@/hooks/useNotification";
import Link from "next/link";

export default function NotificationPage() {
  const {
    notifications,
    fetchNotifications,
    markAsRead,
  } = useNotification();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <div className="max-w-3xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-6">Thông báo</h1>

      {/* Không có thông báo */}
      {notifications.length === 0 && (
        <p className="text-gray-500">Hiện chưa có thông báo.</p>
      )}

      {/* Danh sách thông báo */}
      <div className="space-y-4">
        {notifications.map((noti) => {
          const targetLink =
            noti.bookingId
              ? `/dashboard/bookingManage/${noti.bookingId}`
              : noti.tourId
              ? `/dashboard/tourSelling`
              : "#";

          return (
            <div
              key={noti.id}
              className={`p-4 rounded-lg border cursor-pointer transition
                ${
                  !noti.isRead
                    ? "bg-sky-50 border-sky-300"
                    : "bg-white border-gray-300"
                }
              `}
              onClick={() => markAsRead(noti.id)}
            >
              <Link href={targetLink} className="block">
                <h3
                  className={`font-semibold ${
                    !noti.isRead ? "text-sky-700" : "text-gray-700"
                  }`}
                >
                  {noti.title}
                </h3>

                <p className="text-gray-600 mt-1">{noti.message}</p>

                <p className="text-sm text-gray-400 mt-2">
                  {new Date(noti.createdAt).toLocaleString("vi-VN")}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
