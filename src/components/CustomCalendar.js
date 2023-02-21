import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import { getEvents } from "../api";
import { useState } from "react";

function CustomCalendar(props) {
  const [events, setEvents] = useState("");

  useEffect(() => {
    async function getAllEvents() {
      const response = await getEvents();
      setEvents(response.data);
    };
    console.log(events)
    getAllEvents();
  }, []);

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
        events={events}
      />
    </>
  );
}

export default CustomCalendar;
