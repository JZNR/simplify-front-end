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
  const navigate = useNavigate();
  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(null);
  const [allDay, setAllDay] = useState(false);
  const [description, setDescription] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [color, setColor] = useState(null);

  function handleTitleChange(event) {
    setTitle(event.target.value);
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

  function handleStartTimeChange(time) {
    setStart(time);
  }

  function handleEndTimeChange(time) {
    setEnd(time);
  }

  async function handleGetEvent(eventId) {
    const response = await getOneEvent(eventId);
    console.log(response.data);
    setStart(response.data.start.slice(11, 19));
    setEnd(response.data.end.slice(11, 19));
    setTitle(response.data.title);
    setDate(response.data.date.slice(0, 10));
    setDescription(response.data.description);
    setAllDay(response.data.allDay);
    setColor(response.data.color);
  }

  useEffect(() => {
    if (props.eventId) {
      handleGetEvent(props.eventId);
    }
  }, [props.eventId]);

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      await editEvent({
        title,
        date,
        allDay,
        start,
        end,
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

  return !title ? (
    <div>Loading...</div>
  ) : (
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

          <TimePicker
            onChange={handleStartTimeChange}
            disableClock={true}
            value={start}
          />

          <TimePicker
            onChange={handleEndTimeChange}
            disableClock={true}
            value={end}
          />

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Color</Form.Label>
            <Form.Control type="text" placeholder="#000" value={color} />
          </Form.Group>

          <GithubPicker color={color} onChangeComplete={handleChangeColor} />

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
