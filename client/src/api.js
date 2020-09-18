import axios from "axios";

//API library containing our async functions for everything we need to interact with the backend.

const API_URL = "/api";

export const login = (username, password) => {
  return axios.post(`${API_URL}/authentication`, {
    username: username,
    password: password,
  });
};

export const register = (username, password, confirmPassword, email) => {
    return axios.post(`${API_URL}/register`, {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      email: email
    });
  };

export const getUserUploads = (token) => {
  return axios.get(`${API_URL}/uploads`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadUserFile = (token, data) => {
  return axios.post(`${API_URL}/uploads`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
