import { Snackbar } from "@material-ui/core";
import React from "react";
import { useErrorSelector } from "../../redux/notification/reducer";
import { useDispatch } from "react-redux";
import { Alert } from "@material-ui/lab";
import { resetNotification } from "../../redux/notification/actions";

export const Notify: React.FC = () => {
  const { hasMessage, message, type } = useErrorSelector((state) => state.notification);
  const dispatch = useDispatch();

  const vertical = "bottom";
  const horizontal = "center";

  const handleClose = () => {
    dispatch(resetNotification());
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={hasMessage}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity={type}>{message}</Alert>
      </Snackbar>
    </div>
  );
};
