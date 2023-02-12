import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/App.scss";
import {
  AllTickets,
  Landing,
  ProtectedRoute,
  Register,
  SharedLayout,
  SingleTicketPage,
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
          path="/dashboard"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllTickets />} />
          <Route
            path="/dashboard/singleTicket"
            element={<SingleTicketPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
