import React from 'react';

import { Divider, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';

const styles = {
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
};

const Timeslot = ({ activity }) => (
    <Typography variant="body1" paragraph>
      {`${activity.startTime.toLocaleDateString('nl-BE', {
        // you can use undefined as first argument
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })} ${activity.fields.Startuur.text_value} - ${
        activity.fields.Einduur.text_value
      }`}
    </Typography>
  );

const Activiteit = ({ activity, classes }) => (
    <div className={classes.wrapper}>
      <Paper className={classes.container}>
        <Typography variant="h6" gutterBottom>
          {activity.name}
        </Typography>
        <Divider light className={classes.line} />

        <Typography variant="subtitle2">Waar?</Typography>
        <ReactMarkdown>
          {activity.fields.Locatie.text_value || '\\-'}
        </ReactMarkdown>

        {activity.fields.Contactgegevens.text_value && (
          <ReactMarkdown>
            {activity.fields.Contactgegevens.text_value || '\\-'}
          </ReactMarkdown>
        )}

        <Typography variant="subtitle2">Wanneer?</Typography>
        <Timeslot activity={activity} />

        {activity.fields.Groepsindeling.text_value && (
          <>
            <Typography variant="subtitle2">Wie?</Typography>
            <ReactMarkdown>
              {activity.fields.Groepsindeling.text_value || '\\-'}
            </ReactMarkdown>
          </>
        )}

        {activity.notes && (
          <>
            <Typography variant="subtitle2">Hoe?</Typography>
            <ReactMarkdown>{activity.notes}</ReactMarkdown>
          </>
        )}

        {activity.fields.Materiaal.text_value && (
          <>
            <Typography variant="subtitle2">Wat?</Typography>
            <ReactMarkdown>
              {activity.fields.Materiaal.text_value || '\\-'}
            </ReactMarkdown>
          </>
        )}

        {activity.fields.Media.text_value && (
          <>
            <Typography variant="subtitle2">Bijlages</Typography>
            <ReactMarkdown>
              {activity.fields.Media.text_value || '\\-'}
            </ReactMarkdown>
          </>
        )}
      </Paper>
    </div>
  );

export default withStyles(styles)(Activiteit);
