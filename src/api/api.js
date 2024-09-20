import api from "./validateToken";

const base_url = process.env.REACT_APP_PUBLIC_URL;

export async function userListing(page) {
  try {
    const response = await api.get(`${base_url}/api/users?page=${page}`);
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
    const response = await api.post(`${base_url}/api/logout`, {});
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
  }
}

export async function userCreate(formData) {
  const response = await api.post(`${base_url}/api/users/create`, formData);
  return response;
}

export async function userProfile() {
  const response = await api.get(`${base_url}/api/profile`);
  return response;
}
