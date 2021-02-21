import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    horizontal: {
      display: "flex",
    },
    vertical: {
      display: "flex",
      flexDirection: "column",
    },
    margin: {
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
    },
  }),
);
