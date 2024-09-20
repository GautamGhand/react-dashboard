import { RouterProvider } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/context";
import { Suspense, useState } from "react";
import routes from "./routes/route";

function App() {
  const [user, setUser] = useState(null);
  const base_url = process.env.REACT_APP_PUBLIC_URL;
  const token = localStorage.getItem("authToken");

  return (
    <AuthContext.Provider value={{ user, setUser, base_url, token }}>
      <Suspense callback={<div>Loading ....</div>}>
        <RouterProvider router={routes} />
      </Suspense>
    </AuthContext.Provider>
  );
}

export default App;
