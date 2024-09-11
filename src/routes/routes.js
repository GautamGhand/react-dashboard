import Login from "../pages/auth/Login";
import UserListing from "../pages/dashboard/users/UserListing";

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        name: "dashboard",
        path: "/users",
        element: <UserListing />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        name: "sign in",
        path: "/sign-in",
        element: <Login />,
      },
    ],
  },
];

export default routes;
