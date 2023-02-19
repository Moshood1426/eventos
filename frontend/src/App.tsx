import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/App.scss";
import {
  AllTickets,
  Landing,
  ProtectedRoute,
  Register,
  SharedLayout,
  SingleEventPage,
  CreateEvent,
  Favorites,
  MyEvents,
  MyTickets,
  Profile,
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
        <Route path="/landing" element={<Landing />} />
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
          <Route
            path="single-event"
            element={<SingleEventPage />}
          />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="my-events" element={<MyEvents />} />
          <Route path="my-tickets" element={<MyTickets />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
