import { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import image from "../assets/logo.webp";
import {
  Home,
  BookOpen,
  PenLine,
  Info,
  User,
  LogOut,
  Sun,
  Moon,
  AlignRight,
  X,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth.js";
import { useTheme } from "../hooks/useTheme.js";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, userId, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 w-full bg-ed-bg z-50 transition-colors duration-300">
      <nav className="max-w-4xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Wordmark */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={image}
              alt="Bable"
              className="size-6 rounded-full opacity-85 group-hover:opacity-100 transition-opacity duration-200 translate-y-[0.5px]"
            />
            <span className="font-display text-xl tracking-tight text-ed-text">
              Bable
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-[13px] font-sans-ui font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-ed-text"
                    : "text-ed-text-tertiary hover:text-ed-text"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `text-[13px] font-sans-ui font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-ed-text"
                    : "text-ed-text-tertiary hover:text-ed-text"
                }`
              }
            >
              Blogs
            </NavLink>
            <NavLink
              to={isAuthenticated ? "/create" : "/login"}
              className={({ isActive }) =>
                `text-[13px] font-sans-ui font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-ed-text"
                    : "text-ed-text-tertiary hover:text-ed-text"
                }`
              }
            >
              Write
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-[13px] font-sans-ui font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-ed-text"
                    : "text-ed-text-tertiary hover:text-ed-text"
                }`
              }
            >
              About
            </NavLink>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            {/* Theme toggle pill */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-center w-8 h-8 rounded-full text-ed-text-tertiary hover:text-ed-accent hover:bg-ed-surface-hover transition-all duration-200"
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } mode`}
            >
              <Sun
                className={`size-[16px] absolute transition-all duration-300 ${
                  theme === "light"
                    ? "opacity-0 rotate-90 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                }`}
                strokeWidth={1.75}
              />
              <Moon
                className={`size-[16px] absolute transition-all duration-300 ${
                  theme === "light"
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-0"
                }`}
                strokeWidth={1.75}
              />
            </button>

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-1">
              {isAuthenticated ? (
                <>
                  <NavLink
                    to={userId ? `/profile/${userId}` : "/blogs"}
                    className={({ isActive }) =>
                      `flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
                        isActive
                          ? "text-ed-text bg-ed-surface-hover"
                          : "text-ed-text-tertiary hover:text-ed-text hover:bg-ed-surface-hover"
                      }`
                    }
                    aria-label="Profile"
                  >
                    <User className="size-[16px]" strokeWidth={1.75} />
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-8 h-8 rounded-full text-ed-text-tertiary hover:text-ed-text hover:bg-ed-surface-hover transition-all duration-200"
                    aria-label="Log out"
                  >
                    <LogOut className="size-[16px]" strokeWidth={1.75} />
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2 ml-2">
                  <Link to="/login">
                    <button className="px-4 py-1.5 rounded-full text-[12px] font-sans-ui font-medium text-ed-text-secondary hover:text-ed-text transition-colors duration-200">
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="px-4 py-1.5 rounded-full text-[12px] font-sans-ui font-medium bg-ed-text text-ed-bg hover:opacity-90 transition-all duration-200">
                      Sign up
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full text-ed-text-tertiary hover:text-ed-text hover:bg-ed-surface-hover transition-all duration-200"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="size-[18px]" strokeWidth={1.75} />
              ) : (
                <AlignRight className="size-[18px]" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Thin rule */}
      <div className="max-w-4xl mx-auto px-5 sm:px-6">
        <div className="h-px bg-ed-border" />
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto px-5 sm:px-6 py-4">
          <div className="space-y-0.5">
            {[
              { to: "/", label: "Home", icon: Home },
              { to: "/blogs", label: "Blogs", icon: BookOpen },
              {
                to: isAuthenticated ? "/create" : "/login",
                label: "Write",
                icon: PenLine,
              },
              { to: "/about", label: "About", icon: Info },
            ].map((item) => {
              const IconComponent = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg font-sans-ui text-[14px] font-medium transition-all duration-200 ${
                      isActive
                        ? "text-ed-text bg-ed-surface-hover"
                        : "text-ed-text-secondary hover:text-ed-text hover:bg-ed-surface-hover"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <IconComponent className="size-[16px]" strokeWidth={1.75} />
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          <div className="h-px bg-ed-border my-3" />

          {isAuthenticated ? (
            <div className="space-y-0.5">
              <NavLink
                to={userId ? `/profile/${userId}` : "/blogs"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg font-sans-ui text-[14px] font-medium transition-all duration-200 ${
                    isActive
                      ? "text-ed-text bg-ed-surface-hover"
                      : "text-ed-text-secondary hover:text-ed-text hover:bg-ed-surface-hover"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                <User className="size-[16px]" strokeWidth={1.75} />
                Profile
              </NavLink>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-sans-ui text-[14px] font-medium text-ed-text-secondary hover:text-ed-text hover:bg-ed-surface-hover transition-all duration-200"
              >
                <LogOut className="size-[16px]" strokeWidth={1.75} />
                Log out
              </button>
            </div>
          ) : (
            <div className="flex gap-2.5 pt-1">
              <Link
                to="/login"
                className="flex-1"
                onClick={() => setMenuOpen(false)}
              >
                <button className="w-full py-2.5 rounded-lg text-[13px] font-sans-ui font-medium text-ed-text-secondary border border-ed-border hover:border-ed-text hover:text-ed-text transition-all duration-200">
                  Log in
                </button>
              </Link>
              <Link
                to="/signup"
                className="flex-1"
                onClick={() => setMenuOpen(false)}
              >
                <button className="w-full py-2.5 rounded-lg text-[13px] font-sans-ui font-medium bg-ed-text text-ed-bg hover:opacity-90 transition-all duration-200">
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
