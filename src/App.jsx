import Navbar from "./Layout/Navbar.jsx";
import Footer from "./Layout/Footer.jsx";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext.jsx";

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col p-0 m-0">
        <Toaster />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
