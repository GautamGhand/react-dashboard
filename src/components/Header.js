import React, { useContext } from "react";
import { Button, AppBar, Toolbar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/api"; // Ensure this API is correctly implemented
import { AuthContext } from "../context/context"; // Ensure context is correctly set up

export default function Header() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    const response = await logout();
    if (response.status === 200 && response.data.success) {
      setUser(null);
      localStorage.removeItem("authToken");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
