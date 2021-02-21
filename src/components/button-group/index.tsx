import React from "react";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useStyles } from "./button-group.presets";

interface ButtonGroupProps {
  onCancel?: () => void;
  onSubmit?: () => void;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  onCancel,
  onSubmit,
}: ButtonGroupProps) => {
  const classes = useStyles();
  return (
    <div className={classes.row}>
      {onCancel && (
        <Button
          variant="contained"
          size="small"
          color="default"
          className={classes.button}
          onClick={onCancel}
        >
          Cancel
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={onSubmit}
      >
        Save
      </Button>
    </div>
  );
};
