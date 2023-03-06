import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { createEvent } from "../api";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvents } from "../api";
import TimePicker from "react-time-picker";
import { GithubPicker } from "react-color";

function AddEventModal(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(props.eventDate);
  const [allDay, setAllDay] = useState(false);
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00");
  const [color, setColor] = useState("#ff000");

  useEffect(()=> {
    if(props.eventDate.length > 10) {      
      const preSetTime = props.eventDate.slice(11, 16);
      const [start_hours, start_minutes] = preSetTime.split(":");
      const total_start_minutes = parseInt(start_hours) * 60 + parseInt(start_minutes);
      const total_end_minutes = total_start_minutes + 30;
      const end_hours = Math.floor(total_end_minutes / 60);
      const end_minutes = total_end_minutes % 60;
      const end_time = `${end_hours.toString().padStart(2, "0")}:${end_minutes.toString().padStart(2, "0")}`;
      console.log(end_time); // Output: "09:30"
      const preSetDate = props.eventDate.slice(0, 10);
      setDate(preSetDate)
      setStartTime(preSetTime)
      setEndTime(end_time)
    }
  })
  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleAllDayChange(event) {
    setAllDay(!allDay);
  }
  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleStartTimeChange(time) {
    console.log(time);
    setStartTime(time);
  }

  function handleEndTimeChange(time) {
    console.log(time);
    setEndTime(time);
  }
  function handleChangeColor(color) {
    setColor(color.hex);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      await createEvent({
        title,
        date,
        allDay,
        description,
        startTime,
        endTime,
        color,
      });
      toast.success("Event created ");
      props.onHide(); //hide modal

      //call getEvents to update calendar after adding new event
      const response = await getEvents();
      props.setEvents(response.data);
    } catch (error) {
      toast.error("Error occured", error);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title id="contained-modal-title-vcenter">Add Event </Modal.Title>
        <h6>
          {" "}
          for{" "}
          {new Intl.DateTimeFormat("en-GB", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          }).format(new Date(props.eventDate))}
        </h6>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitForm}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              onChange={handleTitleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-4 flex time-modal">
            <Form.Label className="me-3">Time</Form.Label>
            <TimePicker
              onChange={handleStartTimeChange}
              disableClock={true}
              value={startTime}
            />

            <TimePicker
              onChange={handleEndTimeChange}
              disableClock={true}
              value={endTime}
            />
            <Form.Check
              className="ms-5"
              type="checkbox"
              checked={allDay}
              value={allDay}
              label="All day"
              onChange={handleAllDayChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              onChange={handleDescriptionChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formColor">
            <Form.Label>Color</Form.Label>
            <Form.Control type="text" placeholder="#000" value={color} />
          </Form.Group>

          <GithubPicker color={color} onChangeComplete={handleChangeColor} />

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      {/*<Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>*/}
    </Modal>
  );
}

export default AddEventModal;
