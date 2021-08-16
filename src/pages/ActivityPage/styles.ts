import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  wrapper: {
    margin: 16,
  },
  container: {
    padding: 16,
    margin: "auto",
    marginTop: 16,
    maxWidth: 1000,
  },
  line: {
    marginBottom: 16,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    flex: 1,
  },
  timeContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
  },
}));
