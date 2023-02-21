import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";

function CustomCalendar(props) {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        dateClick={props.handleDateClick}
        selectable={true}
        weekends={true}
        editable={true}
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
