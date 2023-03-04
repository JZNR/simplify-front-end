import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signup } from "../api";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate();

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }
  function handleSurnameChange(event) {
    setSurname(event.target.value);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      await signup({ email, firstName, surname, password });
      toast.success("User Created");
      navigate("/");
    } catch (error) {
      toast.error("Error occured", error);
    }
  }

  return (
    <>
      <Container fluid className="login-page">
        <img src="logo.svg" className="logo" />
        <Row className="h-100">
          <Col className="login-form">
            <div className="width-form">
              <div className="login-form-text">
                {" "}
                <h3 className="mb-4">Register</h3>
                <p className="mb-5">
                  If you already have an account register<br></br> You can{" "}
                  <Link className="link " to={"/"}>
                    Login here !
                  </Link>{" "}
                </p>
              </div>
              <Form onSubmit={handleSubmitForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label htmlFor="email">Email </Form.Label>
                  <Form.Control
                    placeholder="Enter your email address"
                    id="email"
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label htmlFor="name">Name </Form.Label>
                  <Form.Control
                    placeholder="Enter your name"
                    id="name"
                    type="text"
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSurname">
                  <Form.Label htmlFor="name">Surname </Form.Label>
                  <Form.Control
                    placeholder="Enter your surname"
                    id="surname"
                    type="text"
                    value={surname}
                    onChange={handleSurnameChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your Password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>*/}
                <Button variant="primary" type="submit" className="mt-4">
                  Sign Up
                </Button>
              </Form>
            </div>
          </Col>
          <Col className="login-left">
            <img src="illustration.svg" />
            <h3>Welcome to Simplify</h3>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Signup;
