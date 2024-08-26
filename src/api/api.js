import { decodeToken } from "react-jwt";
import api from "./validateToken";

const base_url = process.env.REACT_APP_PUBLIC_URL;
const token = localStorage.getItem("authToken");

export async function userListing(page) {
  const decodedToken = decodeToken(token);

  if (!decodedToken) {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  }

  try {
    const response = await api.get(`${base_url}/api/users?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user listing:", error);
  }
}

export async function login(formData) {
  try {
    const response = await api.post(`${base_url}/api/login`, formData);
    return response;
  } catch (error) {
    console.error("Error during login:", error);
  }
}

export async function logout() {
  try {
    const response = await api.post(
      `${base_url}/api/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

export async function userCreate(formData) {
  try {
    const response = await api.post(`${base_url}/api/users/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
