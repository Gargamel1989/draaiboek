import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Camp } from "../../../hooks/useCamp";
import { Container, CssBaseline, Grid } from "@material-ui/core";
import DraaiboekAppBar from "../../../components/AppBar";

import useStyles from "./styles";
import NotFoundPage from "../../NotFoundPage";

export default function ContactInformationPage({ camp }: { camp: Camp }) {
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

  const classes = useStyles();

  const page = camp.pages.find((p) => p.defaultPage === "Participants");

  if (!page) {
    return <NotFoundPage />;
  }

  const participants = page.participants || [];

  return (
    <>
      <CssBaseline />
      <DraaiboekAppBar title={page.name} backPage="." />
      <Container maxWidth="lg" component="main" className={classes.container}>
        <Grid container spacing={5} alignItems="flex-end">
          <Paper className={classes.root}>
            <Table className={classes.table} stickyHeader={true}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Foto</TableCell>
                  <TableCell align="left">Naam</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participants.map((p) => {
                  return (
                    <TableRow key={p.name}>
                      <TableCell>
                        <img
                          alt={p.name}
                          style={{
                            width: 150,
                            height: 150,
                            border: "2px solid #aaa",
                          }}
                          src={`/img/jongeren/${p.image}.jpg`}
                        />
                      </TableCell>
                      <TableCell align="left" style={{ fontWeight: "bold" }}>
                        {p.name}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Container>
    </>
  );
}
