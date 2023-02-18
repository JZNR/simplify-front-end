import axios from "axios";
const BASE_URL = `${process.env.REACT_APP_PROJECTS_API}`;

export const getEvents = () => {
  return axios.get(`${BASE_URL}/event`);
};

export const getProject = (id) => {
  return axios.get(`${BASE_URL}/project/${id}`);
};

export const deleteProject = (id) => {
  return axios.delete(`${BASE_URL}/project/${id}`);
};

export const createProject = (project) => {
  return axios.post(`${BASE_URL}/projects`, project);
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
