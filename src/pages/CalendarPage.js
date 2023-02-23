import React, { useEffect } from "react";
import CustomCalendar from ".././components/CustomCalendar";
import { useState } from "react";
import AddEventModal from ".././components/AddEventModal";
import { getEvents, deleteEvent } from "../api";

function CalendarPage() {
  const [modalShow, setModalShow] = useState(false);
  const [eventDate, seteventDate] = useState();
  const [events, setEvents] = useState("");

  async function getAllEvents() {
    const response = await getEvents();
    setEvents(response.data);
  }

  const handleDateClick = (arg) => {
    setModalShow(true);
    seteventDate(arg.dateStr);
  };

  function editEvent(e) {
    console.log("eventclick", e.event._def);
    deleteEvent(e.event._def.extendedProps._id);
    getAllEvents();
  }

  useEffect(() => {
    //api call to get events

    getAllEvents();
  }, []);

  return (
    <>
      <CustomCalendar
        handleDateClick={handleDateClick}
        events={events}
        editEvent={editEvent}
      />
      {modalShow && (
        <AddEventModal
          eventDate={eventDate}
          show={modalShow}
          onHide={() => setModalShow(false)}
          setEvents={setEvents}
          editEvent={editEvent}
        />
      )}
    </>
  );
}

export default CalendarPage;
