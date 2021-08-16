import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControl, FormGroup, FormHelperText } from "@material-ui/core";

import { IInput } from "../../hooks/useInput";
import useStyles from "./styles";

export default function ContentForm({
  schedulePageInput,
  materialsPageInput,
  participantsPageInput,
  contactInformationPageInput,
  menuPageInput,
}: {
  schedulePageInput: IInput<boolean>;
  materialsPageInput: IInput<boolean>;
  participantsPageInput: IInput<boolean>;
  contactInformationPageInput: IInput<boolean>;
  menuPageInput: IInput<boolean>;
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6">Default Content</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormHelperText>
              Select the pages to be added automatically in your new
              environment. These can be changed later.
            </FormHelperText>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    name="schedulePage"
                    checked={schedulePageInput.value}
                    onChange={(event) =>
                      schedulePageInput.setValue(event.target.checked)
                    }
                    disabled={true}
                  />
                }
                label="Schedule Page"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    name="materialsPage"
                    checked={materialsPageInput.value}
                    onChange={(event) =>
                      materialsPageInput.setValue(event.target.checked)
                    }
                  />
                }
                label="Materials Page"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    name="contactInformationPage"
                    checked={contactInformationPageInput.value}
                    onChange={(event) =>
                      contactInformationPageInput.setValue(event.target.checked)
                    }
                  />
                }
                label="Contact Information Page"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    name="participantsPage"
                    checked={participantsPageInput.value}
                    onChange={(event) =>
                      participantsPageInput.setValue(event.target.checked)
                    }
                  />
                }
                label="Participants Information Page"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    name="menuPage"
                    checked={menuPageInput.value}
                    onChange={(event) =>
                      menuPageInput.setValue(event.target.checked)
                    }
                  />
                }
                label="Menu Page"
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
