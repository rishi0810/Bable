import Navbar from "./Layout/Navbar.jsx";
import Footer from "./Layout/Footer.jsx";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-ed-bg text-ed-text transition-colors duration-300">
          <Toaster />
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
