// Home.js
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/context";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

function Home() {
  const { setUser, token, base_url, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const fetchData = async () => {
    if (decodeToken(token) == null) {
      localStorage.removeItem("authToken");
      navigate("/");
    }
    if (!token) return;

    try {
      const response = await axios.get(`${base_url}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUser(null);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>{user ? <div>Welcome {user.name}</div> : <div>Loading...</div>}</div>
    </>
  );
}

export default Home;
