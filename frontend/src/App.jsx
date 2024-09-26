import HomePage from "./pages/home/HomePage/HomePage";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React from "react";
import NotFound from "./components/notFound/NotFound";
import Layout from "./layout/Layout";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import { useAuth } from "./context/AuthContext";
const App = () => {
  const { authState } = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: !authState ? <Navigate to={"/login"} /> : <HomePage />,
        },
        {
          path: "/signup",
          element: authState ? <Navigate to={"/"} /> : <RegisterPage />,
        },
        {
          path: "/login",
          element: authState ? <Navigate to={"/"} /> : <LoginPage />,
        },
      ],
    },
  ]);
  return (
    <React.Fragment>
      <Toaster position="top-center" />
      <div>
        <RouterProvider router={router} />
      </div>
    </React.Fragment>
  );
};

export default App;
