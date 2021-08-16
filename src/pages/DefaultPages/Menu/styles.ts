import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: "100%",
    margin: theme.spacing(3, 0, 3),
    overflowX: "auto",
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
  },
  table: {
    minWidth: 700,
  },
  title: {
    flex: "0 0 auto",
  },
  spacer: {
    flex: "1 1 100%",
  },
  pin: {
    height: 32,
  },
}));
