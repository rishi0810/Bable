import { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import image from "../assets/logo.avif";
import { HiMenu, HiX, HiUser, HiLogout } from "react-icons/hi";
import { useAuth } from "../hooks/useAuth.js";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, userId, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src={image} 
                alt="Bable Logo" 
                className="size-8 rounded-full ring-2 ring-transparent group-hover:ring-gray-300 transition-all duration-300" 
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-500/10 to-gray-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Bable
            </h3>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "text-gray-900 bg-gray-100" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to={isAuthenticated ? "/create" : "/login"}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "text-gray-900 bg-gray-100" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              Create
            </NavLink>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "text-gray-900 bg-gray-100" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              Blogs
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "text-gray-900 bg-gray-100" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              About
            </NavLink>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <NavLink
                  to={`/profile/${userId || ''}`}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive 
                        ? "text-gray-900 bg-gray-100" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`
                  }
                >
                  <HiUser className="size-4" />
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                >
                  <HiLogout className="size-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/signup">
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-200">
                    Sign up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg hover:from-gray-900 hover:to-black transition-all duration-200 shadow-sm hover:shadow-md">
                    Log in
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX className="size-6" /> : <HiMenu className="size-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            menuOpen
              ? "max-h-screen opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          } overflow-hidden`}
        >
          <div className="py-4 space-y-2 border-t border-gray-100">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "text-gray-900 bg-gray-100" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to={isAuthenticated ? "/create" : "/login"}
              className={({ isActive }) =>
                `block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "text-gray-900 bg-gray-100" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Create
            </NavLink>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "text-gray-900 bg-gray-100" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              Blogs
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive 
                    ? "text-gray-900 bg-gray-100" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>

            {isAuthenticated ? (
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <NavLink
                  to={`/profile/${userId || ''}`}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive 
                        ? "text-gray-900 bg-gray-100" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <HiUser className="size-4" />
                  Profile
                </NavLink>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
                >
                  <HiLogout className="size-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <Link to="/signup" className="block">
                  <button 
                    onClick={() => setMenuOpen(false)}
                    className="w-full px-4 py-3 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-200"
                  >
                    Sign up
                  </button>
                </Link>
                <Link to="/login" className="block">
                  <button 
                    onClick={() => setMenuOpen(false)}
                    className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg hover:from-gray-900 hover:to-black transition-all duration-200"
                  >
                    Log in
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
