import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(2),
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
