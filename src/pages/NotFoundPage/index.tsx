import React from "react";
import { Container, CssBaseline, Typography } from "@material-ui/core";

import DraaiboekAppBar from "../../components/AppBar";

import useStyles from "./styles";

export default function NotFoundPage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <DraaiboekAppBar backPage="/" />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
            >
              404
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Camp was not found
            </Typography>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}
