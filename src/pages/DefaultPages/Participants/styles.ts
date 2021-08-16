import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    margin: "auto",
    padding: 16,
    maxWidth: 1000,
  },
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
}));
