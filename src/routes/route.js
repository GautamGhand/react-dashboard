import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Login = lazy(() => import("../components/Login"));
const Home = lazy(() => import("../components/Home"));
const UserListing = lazy(() => import("../components/UserListing"));
const UserCreate = lazy(() => import("../components/UserCreate"));
const UserEdit = lazy(() => import("../components/UserEdit"));
const NotFound = lazy(() => import("../components/NotFound"));
const PrivateRoute = lazy(() => import("../components/PrivateRoute"));
const Products = lazy(() => import("../components/Products"));
const Layout = lazy(() => import("../components/Layout"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <PrivateRoute>
            <UserListing />
          </PrivateRoute>
        ),
      },
      {
        path: "/users/create",
        element: (
          <PrivateRoute>
            <UserCreate />
          </PrivateRoute>
        ),
      },
      {
        path: "/users/edit/:id",
        element: (
          <PrivateRoute>
            <UserEdit />
          </PrivateRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
