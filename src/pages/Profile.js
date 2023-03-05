import Button from "react-bootstrap/Button";
import React, { useEffect } from "react";
import { getUser, getEvents } from "../api";
import { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import { UserContext } from "../context/user.context";

function Profile() {
  const [events, setEvents] = useState("");
  const [ user , setUser] = useState(null);
  const { loggedUser } = useContext(UserContext);
  const userId = loggedUser._id;

  async function getAllEvents() {
    const response = await getEvents();
    setEvents(response.data);
  }
  
  async function handleUser() {
    const userResponse = await getUser(userId);
    setUser(userResponse)
  }
  
  useEffect(() => {
    //api call to get events
    handleUser();
    getAllEvents();
  }, [loggedUser]);

  return (
    <div className="profile-page">
      <Button variant="primary" className="edit-profile-button">
        Edit Profile
      </Button>
      <div>
        <div className="name-and-picture mb-5">
          <div className="profile-image">
            <img src="person.png" />{" "}
          </div>{" "}
          <div>
            <h3>Milagros Garcia</h3>
            <h5>{loggedUser.email} </h5>
          </div>
        </div>
      </div>
      <h3>Upcoming events</h3>
      {/* <div className="profile-events">
        {events.map((event) => {
          return (
            <Card>
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {event.startDate}
                </Card.Subtitle>
                <Card.Text>{event.description}</Card.Text>
                <Card.Link href="#">Calendar</Card.Link>
              </Card.Body>
            </Card>
          );
        })} */}
      {/* </div> */}
    </div>
  );
}

export default Profile;
