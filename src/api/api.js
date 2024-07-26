import api from "./validateToken";

const base_url = process.env.REACT_APP_PUBLIC_URL;
const token = localStorage.getItem("authToken");

export async function userListing(page) {
  const response = await api.get(`${base_url}/api/users?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export async function login(formData) {
  const response = await api.post(`${base_url}/api/login`, formData);
  return response;
}

export async function logout() {
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
}

export async function userCreate(formData) {
    const response = await api.post(
        `${base_url}/api/users/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // You can include other headers if needed
          }
        }
    );
    return response;
}
