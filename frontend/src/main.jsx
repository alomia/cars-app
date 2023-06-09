import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cars from "./routes/Cars";
import Car from "./routes/Car";
import NewCar from "./routes/NewCar";
import "./index.css";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "cars",
    element: <Cars />,
  },
  {
    path: "new",
    element: <NewCar />,
  },
  {
    path: "car/:id",
    element: <Car />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
