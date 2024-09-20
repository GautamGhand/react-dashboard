import { useContext, useEffect } from "react";
import { AuthContext } from "../context/context";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { userProfile } from "../api/api";

function Home() {
  const { setUser, token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (decodeToken(token) === null) {
      localStorage.removeItem("authToken");
      navigate("/");
      return;
    }

    const getProfile = async () => {
      const response = await userProfile();
      if (response.data.success) {
        setUser(response.data.user);
      }
    };
    getProfile();
  }, [token, setUser, navigate]);

  return (
    <div>{user ? <div>Welcome {user.name}</div> : <div>Loading...</div>}</div>
  );
}

export default Home;
