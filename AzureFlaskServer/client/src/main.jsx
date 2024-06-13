import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import ErrorPage from "./ErrorPage/ErrorPage";
import CallerPage from "./CallerPage/CallerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CallerPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
