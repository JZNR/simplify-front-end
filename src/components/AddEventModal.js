import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { postEvent } from "../api";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

function AddEventModal(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(props.eventDate);
  const [allDay, setAllDay] = useState("");
  const [description, setDescription] = useState("");

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleTypeChange(event) {
    setType(event.target.value);
  }

  function handleAllDayChange(event) {
    setAllDay(event.target.value);
  }
  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      await postEvent({ title, type, date });
      console.log(postEvent({ title, type, date, allDay, description }));
      toast.success("Event created ");
      navigate("/");
    } catch (error) {
      toast.error("Whatever occured here", error);
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
