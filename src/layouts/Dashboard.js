import React from "react";
import { Routes, Route } from "react-router-dom";
import SideNav from "../widgets/layout/SideNav";
import Footer from "../widgets/layout/Footer";
import routes from "../routes/routes";
import DashboardNavbar from "../widgets/layout/DashboardNavbar";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <SideNav routes={routes} />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route key={path} exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
