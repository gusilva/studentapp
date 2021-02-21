import { NotificationActionTypes, Notification } from "./types";
import { ADD_NOTIFICATION, RESET_NOTIFICATION } from "./constants";

export function addNotification(notification: Notification): NotificationActionTypes {
  return {
    type: ADD_NOTIFICATION,
    payload: notification,
  };
}

export function resetNotification(): NotificationActionTypes {
  return { type: RESET_NOTIFICATION };
}
