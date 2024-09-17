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
  console.log(isDrawerOpen);
  console.log(`calc(100% - ${isDrawerOpen ? drawerWidth : 100}px)`);
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
      navigate("/");
    } else {
      navigate("/");
    }
  };

  if (!token) return null;

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Drawer
        variant="persistent"
        open={isDrawerOpen}
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            transition: "width 0.3s",
          },
        }}
      >
        <Sidebar />
      </Drawer>

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          ml: isDrawerOpen ? `${drawerWidth}px` : 0,
          width: `calc(100% - ${isDrawerOpen ? drawerWidth : 0}px)`,
          transition: "margin 0.3s",
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isDrawerOpen ? `${drawerWidth}px` : 0,
          width: `calc(100% - ${isDrawerOpen ? drawerWidth : 0}px)`,
          transition: "width 0.3s, margin 0.3s",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
