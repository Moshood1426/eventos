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
  Checkout,
  PaymentConfirm,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppSelector } from "./store/hooks";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Landing />,
//   },
// ]);

function App() {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/all-events"
          element={<SharedLayout displayNavMenu={user ? true : false} />}
        >
          <Route index element={<AllTickets />} />
        </Route>

        <Route
          path="/single-event/:eventId"
          element={
            <SharedLayout
              displayNavMenu={user ? true : false}
              displayFooter={true}
            />
          }
        >
          <Route index element={<SingleEventPage />} />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout displayNavMenu={true} />
            </ProtectedRoute>
          }
        >
          {user?.role === "consumer" ? (
            <Route index element={<MyTickets />} />
          ) : (
            <Route index element={<MyEvents />} />
          )}
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="profile" element={<Profile />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout-success" element={<PaymentConfirm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
