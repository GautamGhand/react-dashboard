import { useContext, useEffect } from "react";
import { AuthContext } from "../context/context";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { userProfile } from "../api/api";

function Home() {
  const { setUser, token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    if (decodeToken(token) === null) {
      localStorage.removeItem("authToken");
      navigate("/");
      return;
    }

    try {
      const response = await userProfile();
      if (response.data.success) {
        setUser(response.data.user); // Use response.data.user
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, setUser, navigate]);

  return (
    <div>{user ? <div>Welcome {user.name}</div> : <div>Loading...</div>}</div>
  );
}

export default Home;
