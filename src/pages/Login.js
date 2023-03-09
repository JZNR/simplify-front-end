import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../api";
import { toast } from "react-toastify";
import { useState, useContext } from "react";
import { UserContext } from "../context/user.context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(UserContext);
  const { authenticateUser } = useContext(UserContext);

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem("authToken", response.data);

      await login({ email, password });

      // setting the logged user in the context
      // setLoggedUser({ email, password });
      await authenticateUser();
      toast.success("Logged in");
      navigate("/calendar");
    } catch (error) {
      toast.error("Error occured", error);
    }
  }

  return (
    <Container fluid className="login-page">
      <img src="logo.svg" className="logo" />
      <Row className="h-100">
        <Col className="login-form">
          <div className="width-form">
            <div className="login-form-text">
              {" "}
              <h3 className="mb-4">Log in</h3>
              <p className="mb-5">
                If you don’t have an account register<br></br> You can{" "}
                <Link className="link" to={"/signup"}>
                  Register here !
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
                Login
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
  );
}

export default Login;
