import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import DraaiboekAppBar from "../../components/AppBar";

import useStyles from "./styles";
import { parseDate, stringifyDate } from "../../utils/dates";
import useInput from "../../hooks/useInput";
import { Camp } from "../../hooks/useCamp";

export default function SettingsPage({ camp }: { camp: Camp }) {
  const nameInput = useInput<string>(camp.name);
  const dateFromInput = useInput<Date>(camp.dateFrom);
  const dateUntilInput = useInput<Date>(camp.dateUntil);

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <DraaiboekAppBar title="Camp Settings" backPage="./" />
      <Container maxWidth="lg" className={classes.root}>
        <Grid item lg={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Basic Settings
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Camp Name"
                    fullWidth
                    value={nameInput.value}
                    onChange={(event) => {
                      nameInput.setValue(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="dateFrom"
                    label="From"
                    type="date"
                    className={classes.dateField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={stringifyDate(dateFromInput.value)}
                    onChange={(event) =>
                      dateFromInput.setValue(parseDate(event.target.value))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="dateUntil"
                    label="Until"
                    type="date"
                    className={classes.dateField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={stringifyDate(dateUntilInput.value)}
                    onChange={(event) =>
                      dateUntilInput.setValue(parseDate(event.target.value))
                    }
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                User Management
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
