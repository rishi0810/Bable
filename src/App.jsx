import React from "react";
import Navbar from "./Layout/Navbar.jsx";
import Footer from "./Layout/Footer.jsx";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <div className="min-h-screen p-0 m-0">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
