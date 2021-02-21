import { NotificationState } from "./types";
import { Reducer } from "redux";
import { ADD_NOTIFICATION, RESET_NOTIFICATION } from "./constants";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../index";

export const INITIAL_STATE: NotificationState = {
  hasMessage: false,
  message: null,
  type: "info",
};

export const NotificationReducer: Reducer<NotificationState> = (
  state: NotificationState = INITIAL_STATE,
  { type, payload },
): NotificationState => {
  switch (type) {
    case ADD_NOTIFICATION:
      return {
        hasMessage: true,
        message: payload.message,
        type: payload.type,
      };
    case RESET_NOTIFICATION:
      return {
        ...state,
        hasMessage: false,
        message: null
      };
    default:
      return { ...state };
  }
};

export const useErrorSelector: TypedUseSelectorHook<RootState> = useSelector;
