import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
