import React, { useEffect } from "react";
import CustomCalendar from ".././components/CustomCalendar";
import { useState } from "react";
import AddEventModal from ".././components/AddEventModal";
import { getEvents } from "../api";

function CalendarPage() {
  const [modalShow, setModalShow] = useState(false);
  const [eventDate, seteventDate] = useState();
  const [events, setEvents] = useState("");

  const handleDateClick = (arg) => {
    setModalShow(true);
    seteventDate(arg.dateStr);
  };

  useEffect(() => {
    //api call to get events
    async function getAllEvents() {
      const response = await getEvents();
      setEvents(response.data);
    }
    getAllEvents();
  }, []);

  return (
    <>
      <CustomCalendar handleDateClick={handleDateClick} events={events} />
      {modalShow && (
        <AddEventModal
          eventDate={eventDate}
          show={modalShow}
          onHide={() => setModalShow(false)}
          setEvents={setEvents}
        />
      )}
    </>
  );
}

export default CalendarPage;
