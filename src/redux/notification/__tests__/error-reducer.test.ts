import { INITIAL_STATE, NotificationReducer } from "../reducer";
import { addNotification, resetNotification } from "../actions";

test("add error", () => {
  const message = "An error has occurred";
  const state = NotificationReducer(
    INITIAL_STATE,
    addNotification({ message: "An error has occurred", type: "error" }),
  );
  expect(state.message).toEqual(message);
  expect(state.type).toEqual("error");
  expect(state.hasMessage).toBe(true);
});

test("reset error", () => {
  const state = NotificationReducer(
    { hasMessage: true, message: "Error", type: "error" },
    resetNotification(),
  );
  expect(state.message).toBeNull();
  expect(state.hasMessage).toBe(false);
  expect(state.type).toBe("error");
});
