import React, { useEffect } from "react";
import CustomCalendar from ".././components/CustomCalendar";
import { useState } from "react";
import AddEventModal from ".././components/AddEventModal";
import { getEvents, deleteEvent, updateEvent } from "../api";
import EditEventModal from ".././components/EditEventModal";

function CalendarPage() {
  const [modalShow, setModalShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [eventDate, seteventDate] = useState();
  const [events, setEvents] = useState("");
  const [editEventInfo, setEditEventInfo] = useState("");
  async function getAllEvents() {
    const response = await getEvents();
    setEvents(response.data);
  }

  const handleDateClick = (arg) => {
    setModalShow(true);
    seteventDate(arg.dateStr);
  };

  function handledeleteEvent(e) {
    console.log("delete event", e.event._def.extendedProps._id);
    const eventId = e.event._def.extendedProps._id;
    deleteEvent(eventId);
    setModalEditShow(false);

    getAllEvents();
  }

  function editEvent(e) {
    console.log("event click", e.event._def.extendedProps._id);
    setModalEditShow(true);
    getAllEvents();
    setEditEventInfo(e.event._def);
  }

  useEffect(() => {
    //api call to get events

    getAllEvents();
  }, []);

  function eventDrop(e) {
    console.log(e)
    const updatedEventTime = e.event._instance.range;
    const updatedEventId = e.event._def.extendedProps._id
    updateEvent(updatedEventTime, updatedEventId)
  }

  return (
    <>
      <CustomCalendar
        handleDateClick={handleDateClick}
        events={events}
        editEvent={editEvent}
        eventDrop={eventDrop}
      />
      {modalShow && (
        <AddEventModal
          eventDate={eventDate}
          show={modalShow}
          onHide={() => setModalShow(false)}
          setEvents={setEvents}
        />
      )}
      {modalEditShow && (
        <EditEventModal
          eventDate={eventDate}
          show={modalEditShow}
          onHide={() => setModalEditShow(false)}
          setEvents={setEvents}
          editEvent={editEvent}
          handledeleteEvent={handledeleteEvent}
          editEventInfo={editEventInfo}
        />
      )}
    </>
  );
}

export default CalendarPage;
