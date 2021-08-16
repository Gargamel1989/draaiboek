import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import firebase from "../../firebase";

import AppBar from "../../components/AppBar";

import useStyles from "./styles";
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Loader from "../../components/Loader";
import { Redirect } from "react-router-dom";

export default function SiteAdministration() {
  const [value, loading, error] = useCollection(
    firebase.db.collection("users")
  );

  const classes = useStyles();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Admin</TableCell>
                    <TableCell align="right">Editor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {value &&
                    value.docs.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.data().email}
                        </TableCell>
                        <TableCell align="right">
                          <Checkbox
                            checked={row.data().admin}
                            onChange={() => {
                              firebase.db
                                .collection("users")
                                .doc(row.id)
                                .update({
                                  admin: !row.data().admin,
                                });
                            }}
                            color="primary"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Checkbox
                            checked={row.data().editor}
                            onChange={() => {
                              firebase.db
                                .collection("users")
                                .doc(row.id)
                                .update({
                                  editor: !row.data().editor,
                                });
                            }}
                            color="primary"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}
