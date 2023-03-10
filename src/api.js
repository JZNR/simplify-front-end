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
  return axios.post(`${BASE_URL}/event/edit`, event, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};

export const deleteEvent = (eventID) => {
  return axios.post(`${BASE_URL}/event/delete`, { eventID });
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

export const getUser = (userId) => {
  console.log(userId);
  return axios.get(`${BASE_URL}/user/get`, { userId: userId });
};

// Notes

export const getNotes = () => {
  return axios.get(`${BASE_URL}/notes`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};

export const createNote = (note) => {
  console.log(localStorage.getItem("authToken"));
  return axios.post(`${BASE_URL}/notes/create`, note, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};

export const deleteNote = (noteID) => {
  return axios.post(
    `${BASE_URL}/notes/delete`,
    { noteID },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    }
  );
};

export const editNote = (noteId) => {
  return axios.post(`${BASE_URL}/notes/edit`, noteId, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
};