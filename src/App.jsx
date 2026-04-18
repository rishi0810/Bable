import Navbar from "./Layout/Navbar.jsx";
import Footer from "./Layout/Footer.jsx";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ed-bg text-ed-text transition-colors duration-300">
      <Toaster />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
