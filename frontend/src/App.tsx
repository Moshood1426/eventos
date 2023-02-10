import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/App.scss";
import {
  AllTickets,
  Landing,
  ProtectedRoute,
  Register,
  SharedLayout,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Landing />,
//   },
// ]);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllTickets />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
