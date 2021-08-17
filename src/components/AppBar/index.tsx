import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import MoreIcon from "@material-ui/icons/MoreVert";

import firebase from "../../firebase";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useCamp from "../../hooks/useCamp";

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [user] = useUser();
  const [camp] = useCamp();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <IconButton
            aria-label="display more actions"
            edge="end"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            {user && camp && camp.canEdit && (
              <MenuItem
                onClick={() => {
                  handleClose();

                  history.push(`/camp/${camp.id}/settings`);
                }}
              >
                Camp Settings
              </MenuItem>
            )}
            {user && camp && (
              <MenuItem
                onClick={() => {
                  handleClose();

                  history.push("/");
                }}
              >
                Change Environment
              </MenuItem>
            )}

            {user && (
              <MenuItem
                onClick={async () => {
                  handleClose();

                  await firebase.auth.signOut();
                }}
              >
                Logout
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
