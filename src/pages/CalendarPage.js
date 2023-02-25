import React, { useEffect } from "react";
import CustomCalendar from ".././components/CustomCalendar";
import { useState } from "react";
import AddEventModal from ".././components/AddEventModal";
import { getEvents, deleteEvent, updateEvent, getOneEvent } from "../api";
import EditEventModal from ".././components/EditEventModal";

function CalendarPage() {
  const [modalShow, setModalShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [eventDate, setEventDate] = useState();
  const [events, setEvents] = useState("");
  const [editEventInfo, setEditEventInfo] = useState("");

  async function getAllEvents() {
    const response = await getEvents();
    setEvents(response.data);
  }

  const handleDateClick = (arg) => {
    setModalShow(true);
    setEventDate(arg.dateStr);
  };

  function handleDeleteEvent() {
    const eventID = editEventInfo.extendedProps._id;
    console.log("delete event id", eventID);
    deleteEvent(eventID);
    setModalEditShow(false);
    getAllEvents();
  }

  async function editEvent(e) {
    setModalEditShow(true);
    const eventId = e.event._def.extendedProps._id;

    const response = await getOneEvent(eventId);
    setEditEventInfo(response.data);
    getOneEvent(e.event._def.extendedProps._id);
  }

  useEffect(() => {
    //api call to get events

    getAllEvents();
  }, []);

  function eventDrop(e) {
    console.log(e);
    const updatedEventTime = e.event._instance.range;
    const updatedEventId = e.event._def.extendedProps._id;
    updateEvent(updatedEventTime, updatedEventId);
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
          handleDeleteEvent={handleDeleteEvent}
          editEventInfo={editEventInfo}
        />
      )}
    </>
  );
}

export default CalendarPage;
