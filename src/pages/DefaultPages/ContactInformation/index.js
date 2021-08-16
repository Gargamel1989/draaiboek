import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useCamp from "../../../hooks/useCamp";
import LoadingPage from "../../LoadingPage";
import { Container, CssBaseline, Grid } from "@material-ui/core";
import DraaiboekAppBar from "../../../components/AppBar";

import useStyles from "./styles";

export default function ContactInformationPage(props) {
  // const [campContacts, setCampContacts] = useState(null);
  // const [activityContacts, setActivityContacts] = useState(null);
  // const [bizonContacts, setBizonContacts] = useState(null);
  // const tasks = React.useContext(TaskContext);

  // useEffect(() => {
  //   if (!tasks) return;

  //   const aContacts = [];

  //   tasks.forEach((t) => {
  //     if (t.name === "Contactgegevens") {
  //       setCampContacts(
  //         t.notes.split("\n").map((l) => {
  //           const p = l.split(",");

  //           return {
  //             id: p[0],
  //             name: p[0],
  //             role: p[3],
  //             tel: p[1],
  //             email: p[2],
  //           };
  //         })
  //       );
  //     } else if (t.name === "Contactgegevens Bizon") {
  //       setBizonContacts(
  //         t.notes.split("\n").map((l) => {
  //           const p = l.split(",");

  //           return {
  //             id: p[0],
  //             name: p[0],
  //             role: p[2],
  //             tel: p[1],
  //           };
  //         })
  //       );
  //     } else if (
  //       t.custom_fields.some(
  //         (f) => f.name === "Contactgegevens" && f.text_value !== null
  //       )
  //     ) {
  //       const p = t.custom_fields
  //         .find((f) => f.name === "Contactgegevens")
  //         .text_value.split("\n");

  //       const p2 = t.custom_fields
  //         .find((f) => f.name === "Locatie")
  //         .text_value.split("\n");

  //       aContacts.push({
  //         id: t.gid,
  //         name: p[0],
  //         tel: p[1].split("T: ")[1],
  //         email: p[2].split("E: ")[1],
  //         location: {
  //           address: `${p2[1]}, ${p2[2]}`,
  //           url: p2[3],
  //         },
  //       });
  //     }

  //     setActivityContacts(aContacts);
  //   });
  // }, [tasks]);

  // const { classes } = props;

  const [camp, loading] = useCamp();

  const classes = useStyles();

  if (loading || !camp) {
    return <LoadingPage />;
  }

  const page = camp.pages.find((p) => p.defaultPage === "ContactInformation");

  return (
    <>
      <CssBaseline />
      <DraaiboekAppBar title={page.name} backPage="." />
      <Container maxWidth="lg" component="main" className={classes.container}>
        <Grid container spacing={5} alignItems="flex-end">
          <Paper className={classes.root}>
            <Toolbar className={classes.toolbar}>
              <div className={classes.title}>
                <Typography variant="h6" id="tableTitle">
                  Kampleden
                </Typography>
              </div>
              <div className={classes.spacer} />
            </Toolbar>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Naam</TableCell>
                  <TableCell align="right">Telefoon</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Functie</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/*campContacts ? (
                  campContacts.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                        <a href={`tel:${row.tel}`}>{row.tel}</a>
                      </TableCell>
                      <TableCell align="right">
                        <a href={`milto:${row.email}`}>{row.email}</a>
                      </TableCell>
                      <TableCell align="right">{row.role}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key={0}>
                    <TableCell colSpan={4} align="center">
                      <div
                        style={{
                          width: 64,
                          margin: "16px auto",
                          overflow: "hidden",
                        }}
                      >
                        {" "}
                        <CircularProgress />
                      </div>
                    </TableCell>
                  </TableRow>
                      )*/}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid container spacing={5} alignItems="flex-end">
          <Paper className={classes.root}>
            <Toolbar className={classes.toolbar}>
              <div className={classes.title}>
                <Typography variant="h6" id="tableTitle">
                  Activiteiten
                </Typography>
              </div>
              <div className={classes.spacer} />
            </Toolbar>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Naam</TableCell>
                  <TableCell align="right">Telefoon</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Functie</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/*campContacts ? (
                  campContacts.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                        <a href={`tel:${row.tel}`}>{row.tel}</a>
                      </TableCell>
                      <TableCell align="right">
                        <a href={`milto:${row.email}`}>{row.email}</a>
                      </TableCell>
                      <TableCell align="right">{row.role}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key={0}>
                    <TableCell colSpan={4} align="center">
                      <div
                        style={{
                          width: 64,
                          margin: "16px auto",
                          overflow: "hidden",
                        }}
                      >
                        {" "}
                        <CircularProgress />
                      </div>
                    </TableCell>
                  </TableRow>
                      )*/}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid container spacing={5} alignItems="flex-end">
          <Paper className={classes.root}>
            <Toolbar className={classes.toolbar}>
              <div className={classes.title}>
                <Typography variant="h6" id="tableTitle">
                  Organisatie
                </Typography>
              </div>
              <div className={classes.spacer} />
            </Toolbar>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Naam</TableCell>
                  <TableCell align="right">Telefoon</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Functie</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/*campContacts ? (
                  campContacts.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                        <a href={`tel:${row.tel}`}>{row.tel}</a>
                      </TableCell>
                      <TableCell align="right">
                        <a href={`milto:${row.email}`}>{row.email}</a>
                      </TableCell>
                      <TableCell align="right">{row.role}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key={0}>
                    <TableCell colSpan={4} align="center">
                      <div
                        style={{
                          width: 64,
                          margin: "16px auto",
                          overflow: "hidden",
                        }}
                      >
                        {" "}
                        <CircularProgress />
                      </div>
                    </TableCell>
                  </TableRow>
                      )*/}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Container>
    </>
  );
}
