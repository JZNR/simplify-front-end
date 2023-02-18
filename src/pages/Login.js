import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../api";
import { toast } from "react-toastify";
import { useState, useContext } from "react";
import { UserContext } from "../context/user.context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Form";
import Col from "react-bootstrap/Form";

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
      authenticateUser();
      toast.success("User logged in");
      navigate("/");
    } catch (error) {
      toast.error("Whatever occured here", error);
    }
  }

  return (
    <div className="w-75 justify-content-md-center">
      <Form onSubmit={handleSubmitForm}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="email">Email address</Form.Label>
          <Form.Control
            placeholder="Enter email"
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Link to={"/signup"}>Sign Up</Link>
      </Form>
    </div>
  );
}

export default Login;
