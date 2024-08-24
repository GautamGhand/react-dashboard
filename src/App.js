import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import UserCreate from "./components/UserCreate";
import Login from "./components/Login";
import { AuthContext } from "./context/context";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute";
import UserEdit from "./components/UserEdit";
import UserListing from "./components/UserListing";
import ConditionalLayout from "./components/ConditionalLayout";
import NotFound from "./components/NotFound";

function App() {
  const [user, setUser] = useState(null);
  const base_url = process.env.REACT_APP_PUBLIC_URL;
  const token = localStorage.getItem("authToken");

  return (
    <AuthContext.Provider value={{ user, setUser, base_url, token }}>
      <Router>
        <ConditionalLayout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Home />} />}
            />
            <Route
              path="/users"
              element={<PrivateRoute element={<UserListing />} />}
            />
            <Route
              path="/users/create"
              element={<PrivateRoute element={<UserCreate />} />}
            />
            <Route
              path="/users/edit/:uuid"
              element={<PrivateRoute element={<UserEdit />} />}
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </ConditionalLayout>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
