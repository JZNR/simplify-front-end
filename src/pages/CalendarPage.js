import React from "react";
import CustomCalendar from ".././components/CustomCalendar";
import { useState } from "react";
import AddEventModal from ".././components/AddEventModal";

function CalendarPage() {
  const [modalShow, setModalShow] = useState(false);
  const [eventDate, seteventDate] = useState();
  const handleDateClick = (arg) => {
    setModalShow(true);
    seteventDate(arg.dateStr);
  };
  return (
    <>
      <CustomCalendar handleDateClick={handleDateClick} />
      {modalShow && (
        <AddEventModal
          eventDate={eventDate}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </>
  );
}

export default CalendarPage;
