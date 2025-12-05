"use client";

import { useNotificationContext } from "@/app/context/NotificationSocketContext";

interface Props {
    onClick: () => void;
    shake?: boolean; 
}

export default function AdminNotificationBell({ onClick, shake = false }: Props) {
    const { unreadCount } = useNotificationContext();

    return (
        <div
            onClick={onClick}
            className={`relative flex items-center justify-center 
                w-11 h-11 rounded-full 
                bg-blue-600 hover:bg-blue-500
                cursor-pointer shadow-md transition-all duration-300 active:scale-90
                ${shake ? "animate-bell-shake" : ""}
            `}
        >
            {/* Bell Icon */}
            <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 2a6 6 0 00-6 6v2.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 10.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>

            {/* Badge số thông báo */}
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white 
                    text-xs font-bold w-5 h-5 flex items-center justify-center 
                    rounded-full shadow"
                >
                    {unreadCount > 99 ? "99+" : unreadCount}
                </span>
            )}
        </div>
    );
}
