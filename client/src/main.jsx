import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import Challenges from "./pages/Challenges";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import { ChallengeProvider } from "./contexts/ChallengeContext";
import Challenge from "./components/Challenge";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/challenges",
        element: <Challenges />,
      },
      {
        path: "/challenges/:id",
        element: (
          <ChallengeProvider>
            <Challenge />
          </ChallengeProvider>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
