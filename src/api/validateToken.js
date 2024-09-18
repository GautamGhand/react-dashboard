import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem("authToken");
      // window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;