"use client";

import { useNotificationContext } from "@/app/context/NotificationSocketContext";

export default function AdminNotificationDropdown() {
  const { notifications, markAsRead } = useNotificationContext();

  const handleClick = async (n: any) => {
    console.log("CLICKED NOTIFICATION:", n); // 🔥 LOG 1

    await markAsRead(n.id);

    console.log("AFTER MARK READ"); // 🔥 LOG 2
  };

  console.log("RENDER DROPDOWN UI"); // 🔥 LOG 4

  return (
    <div className="w-80 bg-white shadow-xl rounded-xl border border-gray-200 p-4 z-[99999] relative">
      <h3 className="font-bold text-gray-800 mb-3 text-lg">Thông báo</h3>

      {notifications.length === 0 && (
        <p className="text-gray-500 text-sm">Không có thông báo</p>
      )}

      <div className="max-h-96 overflow-y-auto space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => {
              console.log("DIV CLICKED"); // 🔥 LOG 3
              handleClick(n);
            }}
            className={`p-3 rounded-lg border cursor-pointer transition 
              ${
                n.isRead
                  ? "border-gray-200 bg-white hover:bg-gray-50"
                  : "bg-blue-50 border-blue-200 hover:bg-blue-100"
              }
            `}
          >
            <p className="font-semibold text-gray-900">{n.title}</p>
            <p className="text-gray-700 text-sm">{n.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(n.createdAt).toLocaleString("vi-VN")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
