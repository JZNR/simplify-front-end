import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { createEvent } from "../api";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvents, editEvent, getOneEvent } from "../api";
import TimePicker from "react-time-picker";
import { GithubPicker } from "react-color";

function EditEventModal(props) {
  // Regex for the current Time of the Event being Edited.

  // const eventStartDate = props.editEventInfo.start;
  // const eventEndDate = props.editEventInfo.end;
  // const timeRegex = /T(\d{2}:\d{2}:\d{2})/;

  // const startDateMatch = eventStartDate.match(timeRegex);
  // const endDateMatch = eventEndDate.match(timeRegex);

  // const currentStartTime = startDateMatch[1];
  // const currentEndTime = endDateMatch[1];

  const navigate = useNavigate();
  const [title, setTitle] = useState(null);
  const [type, setType] = useState("event");
  const [date, setDate] = useState(null);
  const [allDay, setAllDay] = useState(false);
  const [description, setDescription] = useState(
   null
  );
  const [color, setColor] = useState(null);

  // const [startTime, setStartTime] = useState(currentStartTime);
  // const [endTime, setEndTime] = useState(currentStartTime);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleTypeChange(event) {
    setType(event.target.value.toLowerCase());
  }

  function handleAllDayChange() {
    setAllDay(!allDay);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleChangeColor(color) {
    setColor(color.hex);
  }

  // function handleStartTimeChange(time) {
  //   console.log(time)
  //   setStartTime(time);
  // }

  // function handleEndTimeChange(time) {
  //   console.log(time)
  //   setEndTime(time);
  // }

  async function handleGetEvent(eventId) {
    const response = await getOneEvent(eventId);
    setTitle(response.data.title);
    setDate(response.data.date);
    setDescription(response.data.description);
    setAllDay(response.data.allDay);
    setColor(response.data.color);
  }

 useEffect(() => {
  if (props.eventId) {
    handleGetEvent(props.eventId);
  }
}, [props.eventId])

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      await editEvent({
        title,
        type,
        date,
        allDay,
        description,
        eventID: props.eventId,
        color,
      });
      toast.success("Event updated ");
      props.onHide(); //hide modal

      //call getEvents to update calendar after adding new event
      const response = await getEvents();
      props.setEvents(response.data);
    } catch (error) {
      toast.error("Error occured", error);
    }
  }

  return !title ? <div>Loading...</div> :  (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Event{" "}
        </Modal.Title>
        <h6>
          {" "}
          for{" "}
          {new Intl.DateTimeFormat("en-GB", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          }).format(new Date(date))}
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
              value={title}
            />
          </Form.Group>
          <Form.Label>Event Type</Form.Label>
          <Form.Select
            onChange={handleTypeChange}
            defaultValue={type}
          >
            <option>Event</option>
            <option>Task</option>
            <option>Meeting</option>
            <option>Reminder</option>
          </Form.Select>

          <Form.Group className="mb-3 mt-3">
            <Form.Check
              defaultChecked={allDay}
              type="checkbox"
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
              value={description}
            />
          </Form.Group>
          {/* 
          <TimePicker 
          onChange={handleStartTimeChange} 
          disableClock={true}
          value={startTime} />

          <TimePicker 
          onChange={handleEndTimeChange} 
          disableClock={true}
          value={endTime} /> */}

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              placeholder="#000"
              value={color}
            />
          </Form.Group>

          <GithubPicker
            color={color}
            onChangeComplete={handleChangeColor}
          />

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button className="delete-event" onClick={props.handleDeleteEvent}>
          Delete Event
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditEventModal;
