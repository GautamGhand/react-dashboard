import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/context";
import { lazy, useState, Suspense } from "react";
import PrivateRoute from "./components/PrivateRoute";
import ConditionalLayout from "./components/ConditionalLayout";
import NotFound from "./components/NotFound";

const Login = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./components/Home"));
const UserListing = lazy(() => import("./components/UserListing"));
const UserCreate = lazy(() => import("./components/UserCreate"));
const UserEdit = lazy(() => import("./components/UserEdit"));

function App() {
  const [user, setUser] = useState(null);
  const base_url = process.env.REACT_APP_PUBLIC_URL;
  const token = localStorage.getItem("authToken");

  return (
    <AuthContext.Provider value={{ user, setUser, base_url, token }}>
      <Router>
        <ConditionalLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <PrivateRoute>
                    <UserListing />
                  </PrivateRoute>
                }
              />
              <Route
                path="/users/create"
                element={
                  <PrivateRoute>
                    <UserCreate />
                  </PrivateRoute>
                }
              />
              <Route
                path="/users/edit/:uuid"
                element={
                  <PrivateRoute>
                    <UserEdit />
                  </PrivateRoute>
                }
              />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </Suspense>
        </ConditionalLayout>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
