import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  formControl: {
    minWidth: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  divider: {
    marginTop: theme.spacing(4),
  },
  dividerText: {
    position: "relative",
    top: -10,
    left: "calc(50% - 20px)",
    backgroundColor: theme.palette.background.default,
    width: 40,
    textAlign: "center",
  },
}));
