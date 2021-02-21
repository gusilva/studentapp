import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  button: {
    margin: theme.spacing(1),
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
