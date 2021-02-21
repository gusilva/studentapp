import React, { useRef, useState } from "react";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  const RenderModal = ({ children }: { children: React.ReactChild }) => (
    <Dialog ref={ref} open={isVisible} onClose={hide} aria-labelledby="form-dialog-title">
      <DialogContent>{children}</DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );

  return {
    show,
    hide,
    RenderModal,
  };
};
