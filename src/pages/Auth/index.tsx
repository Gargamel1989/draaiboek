import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import firebase from "../../firebase";
import useStyles from "./styles";
import useUser from "../../hooks/useUser";
import Loader from "../../components/Loader";

export default function SignIn() {
  const [user, loading, error] = useUser();
  const location = useLocation();

  const classes = useStyles();

  if (loading) {
    return <Loader />;
  }

  if (user && !error) {
    const next = new URLSearchParams(location.search).get("next");

    if (next) {
      return <Redirect to={next} />;
    }
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={async () => {
              const provider = new firebase.app.auth.GoogleAuthProvider();

              try {
                const result = await firebase.auth.signInWithPopup(provider);

                const existingUser = await firebase.db
                  .collection("users")
                  .doc(result.user?.uid)
                  .get();

                if (!existingUser.data()) {
                  await firebase.db
                    .collection("users")
                    .doc(result.user?.uid)
                    .set({
                      email: result.user?.email,
                      admin: false,
                      editor: false,
                      privileges: [],
                    });
                }
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
