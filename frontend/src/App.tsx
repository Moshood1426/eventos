import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/App.scss";
import { Landing } from "./pages";
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
      </Routes>
    </Router>
  );
}

export default App;
