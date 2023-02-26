import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_PROJECTS_API}`;

export const getEvents = () => {
  return axios.get(`${BASE_URL}/event`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};

export const getOneEvent = (eventID) => {
  return axios.get(`${BASE_URL}/event/${eventID}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};

export const createEvent = (event) => {
  return axios.post(`${BASE_URL}/event`, event, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};

// For drag & Drop
export const updateEvent = (eventTime, eventID) => {
  return axios.post(
    `${BASE_URL}/event/update`,
    { eventTime, eventID },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    }
  );
};

// For more detailed editing

export const editEvent = (event) => {
  return axios.post(
    `${BASE_URL}/event/edit`,
    event,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    }
  );
};

export const deleteEvent = (eventID) => {
  return axios.post(`${BASE_URL}/event/delete`, {eventID});
};

export const uploadImage = (uploadData) => {
  return axios.post(`${BASE_URL}/upload`, uploadData);
};

export const login = (user) => {
  return axios.post(`${BASE_URL}/login`, user);
};

export const signup = (user) => {
  return axios.post(`${BASE_URL}/signup`, user);
};

export const verify = (token) => {
  return axios.get(`${BASE_URL}/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
