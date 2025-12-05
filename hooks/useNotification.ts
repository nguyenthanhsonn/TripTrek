import { useContext } from "react";
// import { NotificationContextType } from "@/app/context/NotificationSocketContext";
import { useNotificationContext } from "@/app/context/NotificationSocketContext";

export default function useNotification() {
  return useNotificationContext();
}