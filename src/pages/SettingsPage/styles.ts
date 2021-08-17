import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },

  dateField: {
    width: "100%",
  },
}));
