import React from "react";
import { useParams } from "react-router-dom";
import {
  CssBaseline,
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import format from "date-fns/format";

import AppBar from "../../components/AppBar";
import { Camp } from "../../hooks/useCamp";

import useStyles from "./styles";

type ActivityPageParams = {
  campId: string;
  activityId: string;
};

type Activity = {
  name: string;

  start: Date;
  end: Date;
};

export default function ActivityPage({ camp }: { camp: Camp }) {
  const params = useParams<ActivityPageParams>();

  const classes = useStyles();

  const activity: Activity = {
    ...camp.activities[parseInt(params.activityId, 10)],
    start: camp.activities[parseInt(params.activityId, 10)].start,
    end: camp.activities[parseInt(params.activityId, 10)].end,
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar title={activity.name} backPage="../schedule" />
      <Container maxWidth="lg" className={classes.container}>
        <Grid item lg={12}>
          <Paper className={classes.container}>
            <div className={classes.titleContainer}>
              <Typography variant="h6" className={classes.title}>
                {activity.name}
              </Typography>
              <div className={classes.timeContainer}>
                <Typography variant="caption">
                  {format(activity.start, "HH'u'MM")}
                  {" - "}
                  {format(activity.end, "HH'u'MM")}
                </Typography>
                <Typography variant="caption">
                  {format(activity.start, "dd/MM/yyyy")}
                </Typography>
              </div>
            </div>

            <Divider light className={classes.line} />

            <Typography variant="subtitle2">Spelers</Typography>
            <Typography variant="body2" paragraph>
              Spelers
            </Typography>

            <Typography variant="subtitle2">Materiaal</Typography>
            <Typography variant="body2" paragraph>
              Spelers
            </Typography>

            <Typography variant="subtitle2">Activiteit</Typography>
            <Typography variant="body2" paragraph>
              Spelers
            </Typography>

            <Typography variant="subtitle2">Regels</Typography>
            <Typography variant="body2" paragraph>
              Spelers
            </Typography>

            <Typography variant="subtitle2">Taakverdeling</Typography>
            <Typography variant="body2" paragraph>
              Spelers
            </Typography>

            <Typography variant="subtitle2">Inkleding</Typography>
            <Typography variant="body2" paragraph>
              Spelers
            </Typography>

            <Typography variant="subtitle2">Extra</Typography>
            <Typography variant="body2" paragraph>
              Spelers
            </Typography>

            <Typography variant="subtitle2">Bijlages</Typography>
          </Paper>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
