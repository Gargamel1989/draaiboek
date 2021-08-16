import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import useStyles from "./styles";
import { IInput } from "../../hooks/useInput";
import { parseDate, stringifyDate } from "../../utils/dates";

export default function BasicInformationForm({
  nameInput,
  dateFromInput,
  dateUntilInput,
}: {
  nameInput: IInput<string>;
  dateFromInput: IInput<Date>;
  dateUntilInput: IInput<Date>;
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
