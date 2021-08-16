import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import firebase from "../../firebase";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function DraaiboekAppBar({
  title = "Draaiboeker",
  backPage,
}: {
  title?: string;
  backPage?: string;
}) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {backPage && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => history.push(backPage)}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              console.log(firebase.auth.signOut());
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
