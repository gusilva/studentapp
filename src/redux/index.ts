import { combineReducers } from "redux";
import { StudentReducer } from "./students/reducer";
import { NotificationReducer } from "./notification/reducer";

const rootReducer = combineReducers({
  students: StudentReducer,
  notification: NotificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
