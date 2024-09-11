import React, { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { logout } from "../api/api";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { AuthContext } from "../context/context";

const Layout = ({ children }) => {
  const drawerWidth = 220;
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token && decodeToken(token) === null) {
      localStorage.removeItem("authToken");
      navigate("/");
    }
  }, [token, navigate]);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = async () => {
    const response = await logout();
    if (response.status === 200 && response.data.success) {
      localStorage.removeItem("authToken");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  if (!token) return null;

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Persistent Drawer */}
      <Drawer
        variant="persistent"
        open={isDrawerOpen}
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            transition: "width 0.3s", // Smooth transition for drawer open/close
            pt: 8
          },
        }}
      >
        <Sidebar />
      </Drawer>

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure AppBar is above the drawer
          ml: isDrawerOpen ? `${drawerWidth}px` : 0, // Add margin when the drawer is open
          transition: "margin 0.3s", // Smooth transition for the AppBar
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
          <Button onClick={handleLogout} variant="contained">
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${isDrawerOpen ? drawerWidth : 0}px)`, // Adjust width based on drawer state
          transition: "width 0.3s, margin 0.3s", // Smooth transition for layout adjustment
          ml: isDrawerOpen ? `${drawerWidth}px` : 0, // Shift content when drawer is open
        }}
      >
        <Toolbar /> {/* To push content below the AppBar */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
