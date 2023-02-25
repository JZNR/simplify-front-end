import React, { useEffect } from "react";
import CustomCalendar from ".././components/CustomCalendar";
import { useState } from "react";
import AddEventModal from ".././components/AddEventModal";
import EditEventModal from ".././components/EditEventModal";
import { getEvents, deleteEvent } from "../api";

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
    const deleteEventId = editEventInfo.extendedProps._id;
    console.log("delete event id", deleteEventId);
    deleteEvent(deleteEventId);
    //setModalEditShow(false);
    //getAllEvents();
  }

  function editEvent(e) {
    setModalEditShow(true);
    getAllEvents();
    setEditEventInfo(e.event._def);
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
