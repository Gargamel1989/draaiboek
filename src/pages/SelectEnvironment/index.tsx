import React from "react";
import { Link } from "react-router-dom";
import mFirebase from "firebase";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

import DraaiboekAppBar from "../../components/AppBar";

import useStyles from "./styles";
import useUser from "../../hooks/useUser";
import firebase from "../../firebase";

export default function SelectEnvironment() {
  const [user] = useUser();
  const [env, setEnv] = React.useState<string>("");
  const [camps, setCamps] = React.useState<mFirebase.firestore.DocumentData[]>(
    []
  );

  const classes = useStyles();

  React.useEffect(() => {
    document.title = "Draaiboeker";
  }, []);

  React.useEffect(() => {
    if (!user) return;

    const unsub = firebase.db
      .collection("camps")
      .where("editors", "array-contains", user.email)
      .onSnapshot((snapshot) => {
        setCamps(
          snapshot.docs.map((d) => ({
            uid: d.id,
            ...d.data(),
          }))
        );
      });

    return unsub;
  }, [user]);

  return (
    <React.Fragment>
      <CssBaseline />
      <DraaiboekAppBar />

      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HomeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Select your environment
          </Typography>
          <form className={classes.form} noValidate>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Environment
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Environment"
                value={env}
                onChange={(event) => setEnv(event.target.value as string)}
              >
                {user?.admin && (
                  <MenuItem value="admin">
                    <em>Site Administration</em>
                  </MenuItem>
                )}
                {camps.map((camp) => (
                  <MenuItem key={camp.uid} value={camp.uid}>
                    <em>
                      {camp.name} {camp.dateFrom.toDate().getFullYear()}
                    </em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Link
              to={() => {
                if (env === "admin") return "/admin";

                return `/camp/${env}`;
              }}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={env === ""}
              >
                Open
              </Button>
            </Link>
          </form>
        </div>
        {(user?.admin || user?.editor) && (
          <>
            <Divider className={classes.divider} />
            <div className={classes.dividerText}>OR</div>
            <Link to="/createEnvironment">
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Create New Environment
              </Button>
            </Link>
          </>
        )}
      </Container>
    </React.Fragment>
  );
}
