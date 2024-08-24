// Home.js
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/context";
import Layout from "./Layout";
import axios from "axios";
import { decodeToken } from "react-jwt";

function Home() {
  const { setUser,token,base_url } = useContext(AuthContext);
  const fetchData = async () => {
    if(decodeToken(token) == null){
      localStorage.removeItem('authToken');
      window.location.href="/";
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

  return <Layout />;
}

export default Home;
