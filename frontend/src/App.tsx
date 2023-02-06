import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/App.scss";
import { Landing } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
