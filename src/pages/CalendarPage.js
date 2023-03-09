import React, { useEffect } from "react";
import CustomCalendar from ".././components/CustomCalendar";
import { useState, useContext } from "react";
import AddEventModal from ".././components/AddEventModal";
import { getEvents, deleteEvent, updateEvent, getOneEvent } from "../api";
import EditEventModal from ".././components/EditEventModal";
import { UserContext } from "../context/user.context";
import Spinner from "react-bootstrap/Spinner";

function CalendarPage() {
  const [modalShow, setModalShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [eventDate, setEventDate] = useState();
  const [events, setEvents] = useState("");
  const { loggedUser } = useContext(UserContext);
  const [eventId, setEventId] = useState(null);

  async function getAllEvents() {
    const response = await getEvents();
    console.log("response events", response);
    setEvents(response.data);
  }

  const handleDateClick = (arg) => {
    setModalShow(true);
    setEventDate(arg.dateStr);
  };

  async function editEvent(e) {
    setModalEditShow(true);
    setEventId(e.event._def.extendedProps._id);
  }

  function handleDeleteEvent() {
    console.log("delete event id", eventId);
    deleteEvent(eventId);
    setModalEditShow(false);
    getAllEvents();
  }

  useEffect(() => {
    //api call to get events

    getAllEvents();
  }, [loggedUser]);

  function eventDrop(e) {
    console.log(e);
    const updatedEventTime = e.event._instance.range;
    const updatedEventId = e.event._def.extendedProps._id;
    updateEvent(updatedEventTime, updatedEventId);
  }

  return !events ? (
    <div className="spinner">
      <Spinner animation="border" variant="light" />
    </div>
  ) : (
    <div className="calendar-page">
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
      {modalEditShow && eventId && (
        <EditEventModal
          eventDate={eventDate}
          show={modalEditShow}
          onHide={() => setModalEditShow(false)}
          setEvents={setEvents}
          editEvent={editEvent}
          handleDeleteEvent={handleDeleteEvent}
          eventId={eventId}
        />
      )}
    </div>
  );
}

export default CalendarPage;
