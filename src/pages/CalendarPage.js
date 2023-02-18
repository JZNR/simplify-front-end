import React from "react";
import CustomCalendar from ".././components/CustomCalendar";
import { useState } from "react";
import AddEventModal from ".././components/AddEventModal";

function CalendarPage() {
  const [modalShow, setModalShow] = useState(false);

  const handleDateClick = (args) => {
    setModalShow(true);
  };
  return (
    <>
      <CustomCalendar handleDateClick={handleDateClick} />
      {modalShow && (
        <AddEventModal show={modalShow} onHide={() => setModalShow(false)} />
      )}
    </>
  );
}

export default CalendarPage;
