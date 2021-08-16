import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/nl-be';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CircularProgress, withStyles } from '@material-ui/core';
import TaskContext from '../../components/base/App/TaskContext';

const TimeGrid = require('react-big-calendar/lib/TimeGrid');
const Toolbar = require('react-big-calendar/lib/Toolbar');
const constants = require('react-big-calendar/lib/utils/constants');

const localizer = momentLocalizer(moment);

const styles = {
  container: {
    margin: 16
  }
};

const year = new Date().getFullYear();

const getActivityColor = task => {
  const statusField = task.custom_fields.find(f => f.name === 'Status');
  const status = statusField.enum_value ? statusField.enum_value.name : null;
  const keuken = task.tags && task.tags.find(t => t.name === 'Keuken');
  const logistiek = task.tags && task.tags.find(t => t.name === 'Logistiek');

  if (logistiek) {
    return '#948a6d';
  }
  if (status === 'Nog niet aan begonnen') {
    // Nog niet aan begonnen
    return '#FD7272';
  }
  if (status === 'Planning') {
    // Concept vastgelegd
    return '#FF9800';
  }
  if (status === 'Details') {
    // Joep is er mee klaar
    return '#FFEB3B';
  }
  if (status === 'Volledig in orde') {
    // Volledig in orde
    return '#BDC581';
  }

  if (keuken) {
    return '#1B9CFC';
  }

  return 'rgba(0, 0, 0, 0)';
};

const CustomWeekViewComponent = props => {
  const tasks = React.useContext(TaskContext);
  const [range, setRange] = React.useState([new Date(2021, 1, 0)]);

  React.useEffect(
    () => {
      if (!tasks) return;
      const dayDict = {};

      tasks
        .filter(task => task.tags && task.tags.find(t => t.name === 'Keuken'))
        .forEach(task => {
          const section = task.memberships[0].section.name;

          if (section === 'Algemeen') return;

          const datestring = section.split(' ')[1];
          const day = parseInt(datestring.split('/')[0], 10);
          const month = parseInt(datestring.split('/')[1], 10);
          const date = new Date(year, month - 1, day);

          if (!dayDict[date.getTime()]) dayDict[date.getTime()] = true;
        });

      setRange(
        Object.keys(dayDict)
          .sort()
          .map(d => new Date(parseInt(d, 10)))
      );
    },
    [tasks]
  );

  return <TimeGrid {...props} range={range} eventOffset={15} />;
};

CustomWeekViewComponent.title = () => '';

class CustomToolbar extends Toolbar {
  render() {
    const {
      localizer: { messages },
      label,
      view
    } = this.props;

    return (
      <div className="rbc-toolbar">
        {view === 'day' && (
          <span className="rbc-btn-group">
            <button
              type="button"
              onClick={this.navigate.bind(null, constants.navigate.TODAY)}
            >
              {messages.today}
            </button>
            <button
              type="button"
              onClick={this.navigate.bind(null, constants.navigate.PREVIOUS)}
            >
              {messages.previous}
            </button>
            <button
              type="button"
              onClick={this.navigate.bind(null, constants.navigate.NEXT)}
            >
              {messages.next}
            </button>
          </span>
        )}
        <span className="rbc-toolbar-label">{label}</span>

        <span className="rbc-btn-group">{this.viewNamesGroup(messages)}</span>
      </div>
    );
  }
}

const CustomEvent = ({ event }) => (
  <div
    style={{
      backgroundColor: getActivityColor(event.resource),
      height: 80,
      padding: 5,
      borderRadius: 4,
      border: `2px solid rgba(0, 0, 0, 0.1)`,
      fontSize: 16,
      overflow: 'hidden'
    }}
  >
    {event.title}
  </div>
);

const KeukenSchedule = ({ classes, onSelectEvent }) => {
  const tasks = React.useContext(TaskContext);

  if (!tasks)
    return (
      <div style={{ margin: 32, textAlign: 'center' }}>
        <CircularProgress />
      </div>
    );

  const events = tasks
    .filter(
      task =>
        task.memberships[0].section.name !== 'Algemeen' &&
        task.tags &&
        task.tags.find(t => t.name === 'Keuken')
    )
    .map(t => {
      const date = t.memberships[0].section.name.split(' ')[1];
      const startTime = t.custom_fields.find(f => f.name === 'Startuur')
        .text_value;
      const endTime = t.custom_fields.find(f => f.name === 'Einduur')
        .text_value;

      return {
        id: t.gid,
        title: t.custom_fields.find(f => f.name === 'Keuken').text_value,
        start: new Date(
          year,
          date.split('/')[1] - 1,
          date.split('/')[0],
          startTime.split(':')[0],
          startTime.split(':')[1]
        ),
        end: new Date(
          year,
          date.split('/')[1] - 1,
          date.split('/')[0],
          endTime.split(':')[0],
          endTime.split(':')[1]
        ),
        resource: t
      };
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const todayIsDuringWeek =
    Date.now() > events[0].start.getTime() &&
    Date.now() < events[events.length - 1].end.getTime();

  return (
    <div className={classes.container}>
      <Calendar
        localizer={localizer}
        events={events}
        views={{ agenda: true }}
        min={new Date(1970, 1, 1, 8)}
        getNow={() => (todayIsDuringWeek ? new Date() : events[0].start)}
        components={{ event: CustomEvent, toolbar: CustomToolbar }}
        defaultView={'agenda'}
        formats={{
          eventTimeRangeFormat: () => ''
        }}
        eventPropGetter={event => ({
          style: {
            border: 0,
            padding: 2,
            backgroundColor: 'rgba(0,0,0,0)'
          }
        })}
        popup
        style={{
          height: 'calc(100vh - 116px)'
        }}
        onSelectEvent={onSelectEvent}
      />
    </div>
  );
};

export default withStyles(styles)(KeukenSchedule);
