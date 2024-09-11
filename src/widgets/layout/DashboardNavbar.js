import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button, Breadcrumbs, Typography } from "@material-tailwind/react";
import { logout } from "../../api/api";

export default function DashboardNavbar() {
 
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();
    if (response.status === 200 && response.data.success) {
      localStorage.removeItem("authToken");
      navigate("/auth/login");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      {/* <div>
        <Breadcrumbs>
          <Link to={`/${layout}`}>
            <Typography
              variant="small"
              className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
            >
              {layout}
            </Typography>
          </Link>
          <Typography variant="small" className="font-normal">
            {page}
          </Typography>
        </Breadcrumbs>
      </div> */}
      <Button variant="text" className="normal-case" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
