import { ADD_NOTIFICATION, RESET_NOTIFICATION } from "./constants";

export interface Notification {
  message: string | null;
  type: "error" | "warning" | "info" | "success";
}

interface AddNotificationAction {
  type: typeof ADD_NOTIFICATION;
  payload: Notification;
}

interface ResetNotificationAction {
  type: typeof RESET_NOTIFICATION;
}

export interface NotificationState {
  hasMessage: boolean;
  message: string | null;
  type: "error" | "warning" | "info" | "success";
}

export type NotificationActionTypes = AddNotificationAction | ResetNotificationAction;
