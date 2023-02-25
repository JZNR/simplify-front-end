import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import { updateEvent } from "../api";

function CustomCalendar(props) {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        dateClick={props.handleDateClick}
        weekends={true}
        editable
        eventDrop={(e) => props.eventDrop(e)}
        eventClick={(e) => props.editEvent(e)}
        eventResize={(e) => props.eventDrop(e)}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
        }}
        selectable={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={props.events}
      />
    </>
  );
}

export default CustomCalendar;
