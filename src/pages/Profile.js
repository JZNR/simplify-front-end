import Button from "react-bootstrap/Button";
import React, { useEffect } from "react";
import { getUser, getEvents } from "../api";
import { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import { UserContext } from "../context/user.context";
import EditProfileModal from "../components/EditProfileModal";
import Spinner from "react-bootstrap/Spinner";

function Profile() {
  const [events, setEvents] = useState("");
  const [user, setUser] = useState(null);
  const { loggedUser } = useContext(UserContext);
  const userId = loggedUser._id;
  const [editProfileModalShow, setEditProfileModalShow] = useState(false);

  async function getAllEvents() {
    const response = await getEvents();
    setEvents(response.data);
  }

  function handleDate(date) {
    const newDate = new Date(`${date.slice(0, 10)}`);
    const dayAndDate = newDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    const time = newDate.toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
    });
    return dayAndDate + " at " + time;
  }
  function handleModalShow() {
    setEditProfileModalShow(true);
  }

  useEffect(() => {
    //api call to get events
    setUser(loggedUser);

    getAllEvents();
  }, [loggedUser]);

  return !user && !events ? (
    <div className="spinner">
      <Spinner animation="border" variant="light" />
    </div>
  ) : (
    <>
      <div className="profile-page">
        {/*<Button
          variant="primary"
          className="edit-profile-button"
          onClick={handleModalShow}
        >
          Edit Profile
        </Button>*/}
        <div>
          <div className="name-and-picture mb-5">
            {/*<div className="profile-image">
              <img src="person.png" />{" "}
            </div>{" "}*/}
            <div>
              <h2>
                {user.firstName} {user.surname}
              </h2>
              <h4>{user.email} </h4>
            </div>
          </div>
        </div>
        <h4>Upcoming events</h4>
        <div className="profile-events">
          {events &&
            events.map((event) => {
              return (
                <Card key={event._id}>
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {event.startDate}
                    </Card.Subtitle>
                    <Card.Text>{event.description}</Card.Text>
                    <Card.Text>{handleDate(event.start)}</Card.Text>
                    {/*<Card.Link href="#">See calendar</Card.Link>*/}
                  </Card.Body>
                </Card>
              );
            })}
        </div>
      </div>

      {editProfileModalShow && (
        <EditProfileModal
          show={editProfileModalShow}
          onHide={() => setEditProfileModalShow(false)}
          user={user}
        />
      )}
    </>
  );
}

export default Profile;
