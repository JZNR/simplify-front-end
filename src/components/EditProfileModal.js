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

function EditProfileModal(props) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.surname);
  const [email, setEmail] = useState(props.user.email);
  const [password, setPassword] = useState(props.user.password);

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  async function handleGetEvent(eventId) {
    const response = await getOneEvent(eventId);
    setFirstName(response.data.firstName);
    setLastName(response.data.lastName);
    setEmail(response.data.email);
    setPassword(response.data.password);
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
        firstName,
        lastName,
        email,
        password,
      });
      toast.success("Profile Updated");
      props.onHide(); //hide modal
    } catch (error) {
      toast.error("Error occured", error);
    }
  }
  return (
    //return !firstName ? (
    //  <div>Loading...</div>
    //) : (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitForm}>
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              onChange={handleFirstNameChange}
              value={firstName}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              onChange={handleLastNameChange}
              value={lastName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmailEdit">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              onChange={handleEmailChange}
              value={email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPaswordEdit">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              value="*********"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditProfileModal;
