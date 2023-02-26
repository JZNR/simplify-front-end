import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { createEvent } from "../api";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getEvents } from "../api";
import TimePicker from 'react-time-picker';
import { GithubPicker } from 'react-color';


function AddEventModal(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("event");
  const [date, setDate] = useState(props.eventDate);
  const [allDay, setAllDay] = useState(false);
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("12:00");
  const [color, setColor] = useState("#ff000")

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleTypeChange(event) {
    setType(event.target.value);
  }

  function handleAllDayChange(event) {
    setAllDay(!allDay);
  }
  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }
  
  function handleStartTimeChange(time) {
    console.log(time)
    setStartTime(time);
  }

  function handleEndTimeChange(time) {
    console.log(time)
    setEndTime(time);
  }
  function handleChangeColor(color) {
    setColor(color.hex)
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      await createEvent({ title, type, date, allDay, description, startTime, endTime, color});
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Event </Modal.Title>
        {props.eventDate}
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
          <Form.Select onChange={handleTypeChange}>
            <option>event</option>
            <option>task</option>
            <option>meeting</option>
            <option>reminder</option>
          </Form.Select>

          <Form.Group className="mb-3">
            <Form.Check
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

          <TimePicker 
          onChange={handleStartTimeChange} 
          disableClock={true}
          value={startTime} />

          <TimePicker 
          onChange={handleEndTimeChange} 
          disableClock={true}
          value={endTime} />

        <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              placeholder="#000"
              value={color}
            />
          </Form.Group>

          <GithubPicker
           color={ color }
           onChangeComplete={ handleChangeColor }
          />

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
