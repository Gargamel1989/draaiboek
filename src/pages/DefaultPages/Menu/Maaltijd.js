import React from 'react';

import { Divider, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  wrapper: {
    margin: 16
  },
  container: {
    padding: 16,
    margin: 'auto',
    marginTop: 16,
    maxWidth: 1000
  },
  line: {
    marginBottom: 16
  }
});

const Maaltijd = ({ meal, classes }) => (
  <div className={classes.wrapper}>
    <Paper className={classes.container}>
      <Typography variant="h6" gutterBottom>
        {meal.name}
      </Typography>
      <Divider light className={classes.line} />

      <Typography variant="subtitle2">Beschrijving</Typography>
      <Typography variant="body1" paragraph>
        {meal.fields.Locatie.text_value || '???'}
      </Typography>

      <Typography variant="subtitle2">Ingredienten</Typography>
      <Typography variant="body1" paragraph>
        {meal.startTime.toLocaleDateString()}, {meal.fields.Startuur.text_value}{' '}
        - {meal.fields.Einduur.text_value}
      </Typography>
    </Paper>
  </div>
);

export default withStyles(styles)(Maaltijd);
