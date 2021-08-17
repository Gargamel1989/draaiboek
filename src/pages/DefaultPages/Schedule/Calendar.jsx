import React from "react";
import {
  Calendar as ReactBigCalendar,
  dateFnsLocalizer,
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import add from "date-fns/add";
import isBefore from "date-fns/isBefore";
import nlBE from "date-fns/locale/nl-BE";

import "react-big-calendar/lib/css/react-big-calendar.css";

import useStyles from "./styles";

const TimeGrid = require("react-big-calendar/lib/TimeGrid");
const Toolbar = require("react-big-calendar/lib/Toolbar");
const constants = require("react-big-calendar/lib/utils/constants");

const locales = {
  "nl-BE": nlBE,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// const getActivityColor = (task) => {
//   const statusField = task.custom_fields.find((f) => f.name === "Status");
//   const status = statusField.enum_value ? statusField.enum_value.name : null;
//   const keuken = task.tags && task.tags.find((t) => t.name === "Keuken");
//   const logistiek = task.tags && task.tags.find((t) => t.name === "Logistiek");

//   if (logistiek) {
//     return "rgba(168, 162, 145, 0.8)";
//   }

//   if (status === "Nog niet aan begonnen") {
//     // Nog niet aan begonnen
//     return "rgba(253, 114, 114, 0.9)";
//   }
//   if (status === "Planning") {
//     // Concept vastgelegd
//     return "rgba(255, 152, 0, 0.9)";
//   }
//   if (status === "Details") {
//     // Joep is er mee klaar
//     return "rgba(224, 206, 7, 0.9)";
//   }
//   if (status === "Volledig in orde") {
//     // Volledig in orde
//     return "rgba(189, 197, 129, 0.9)";
//   }

//   if (keuken) {
//     return "rgba(57, 150, 219, 0.8)";
//   }

//   return "rgba(0, 0, 0, 0)";
// };

const CustomWeekViewComponent = (camp) => {
  const View = (props) => {
    const range = [camp.dateFrom];

    while (isBefore(range[range.length - 1], camp.dateUntil)) {
      range.push(add(range[range.length - 1], { days: 1 }));
    }

    return <TimeGrid {...props} range={range} eventOffset={15} />;
  };

  View.title = () => "";

  return View;
};

class CustomToolbar extends Toolbar {
  render() {
    const {
      localizer: { messages },
      label,
      view,
    } = this.props;

    return (
      <div className="rbc-toolbar">
        {view === "day" && (
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
      backgroundColor: "rgba(189, 197, 129, 0.9)",
      height: "100%",
      padding: 5,
      borderRadius: 4,
      border: `2px solid rgba(0, 0, 0, 0.1)`,
      fontSize: 10,
      overflow: "hidden",
    }}
  >
    {event.title}
  </div>
);

export default function Calendar({ camp, onSelectEvent }) {
  const classes = useStyles();

  const events = camp.activities.map((a, i) => ({
    id: i,
    title: a.name,
    start: a.start,
    end: a.end,
    resource: {
      id: i,
      ...a,
    },
  }));

  const todayIsDuringWeek =
    Date.now() > camp.dateFrom.getTime() &&
    Date.now() < camp.dateUntil.getTime();

  return (
    <div className="activity-schedule">
      <div className={classes.calendarContainer}>
        <ReactBigCalendar
          localizer={localizer}
          events={events}
          views={{ week: CustomWeekViewComponent(camp), day: true }}
          min={new Date(1970, 1, 1, 8)}
          getNow={() => (todayIsDuringWeek ? new Date() : camp.dateFrom)}
          components={{ event: CustomEvent, toolbar: CustomToolbar }}
          defaultView={window.innerWidth < 1000 ? "day" : "week"}
          formats={{
            eventTimeRangeFormat: () => "",
          }}
          eventPropGetter={(event) => ({
            style: {
              border: 0,
              padding: 2,
              backgroundColor: "rgba(0,0,0,0)",
            },
          })}
          popup
          style={{
            height: "calc(100vh - 116px)",
          }}
          onSelectEvent={onSelectEvent}
        />
      </div>
    </div>
  );
}
