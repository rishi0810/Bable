import { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import image from "../assets/logo.avif";
import toast from "react-hot-toast";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const navigate = useNavigate();
  const [isloggedin, setisloggedin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const checkAuth = async () => {
    const response = await fetch(
      "https://bable-backend.vercel.app/user/authcheck",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    return data.Authenticated;
  };

  useEffect(() => {
    const currentstatus = async () => {
      const authStatus = await checkAuth();
      setisloggedin(authStatus);
    };

    currentstatus();
  }, []);

  const handlelogout = async () => {
    const logoutPromise = fetch(
      "https://bable-backend.vercel.app/user/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    toast.promise(logoutPromise, {
      loading: "Logging out...",
      success: "Logged out successfully!",
      error: "Failed to logout.",
    });

    try {
      const response = await logoutPromise;

      if (response.ok) {
        setTimeout(() => {
          navigate("/login");
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <header className="sticky top-0 w-full px-4 sm:px-8 bg-white z-50 shadow-md">
      <nav className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <img src={image} alt="" className="size-7 rounded-full" />
          <h3 className="font-bold text-xl sm:text-2xl">Bable</h3>
        </div>
        <button
          className="sm:hidden ml-auto text-3xl p-2 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
        <div
          className={`flex-col sm:items-center items-start sm:flex-row flex sm:border-none gap-x-7 gap-y-2
                      mx-auto absolute sm:static top-12 right-0 sm:right-0
                      w-full p-4 sm:w-auto bg-white sm:bg-transparent
                      shadow-md sm:shadow-none z-40 transition-all duration-300 ease-in-out
                      transform origin-top-right
                      ${
                        menuOpen
                          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                      }
                      sm:opacity-100 sm:scale-100 sm:translate-y-0 sm:pointer-events-auto`}
        >
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `relative inline-block text-black px-3 py-2 sm:border-none border-b border-zinc-400 sm:w-fit w-full ${
                isActive ? "sm:bg-zinc-200/60 bg-none" : "hover:text-zinc-600"
              }`
            }
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Home
          </NavLink>
          <NavLink
            to={isloggedin ? "/create" : "/login"}
            className={({ isActive }) =>
              `relative inline-block text-black px-3 py-2 sm:border-none border-b border-zinc-400 sm:w-fit w-full ${
                isActive ? "sm:bg-zinc-200/60 bg-none" : "hover:text-zinc-600"
              }`
            }
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Create
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              `relative inline-block text-black px-3 py-2 sm:border-none border-b border-zinc-400 sm:w-fit w-full ${
                isActive ? "sm:bg-zinc-200/60 bg-none" : "hover:text-zinc-600"
              }`
            }
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Blogs
          </NavLink>

          {isloggedin ? (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `relative inline-block text-black px-3 py-2 ${
                  isActive
                    ? "border-b-2 border-zinc-600"
                    : "hover:text-zinc-600"
                }`
              }
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Profile
            </NavLink>
          ) : null}

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative inline-block text-black px-3 py-2 sm:border-none border-b border-zinc-400 sm:w-fit w-full ${
                isActive ? "sm:bg-zinc-200/60 bg-none" : "hover:text-zinc-600"
              }`
            }
            onClick={() => setMenuOpen(!menuOpen)}
          >
            About
          </NavLink>
          {isloggedin ? (
            <button
              className="bg-zinc-300 rounded-sm p-2 w-full sm:w-auto hover:bg-zinc-400 hover:text-white cursor-pointer font-semibold"
              onClick={() => {
                setMenuOpen(false);
                handlelogout();
              }}
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto sm:mt-0 mt-5">
              <Link to={"/signup"} className="w-full sm:w-fit">
                <button
                  type="button"
                  className="py-2 px-3 text-sm font-medium rounded-md bg-white border  text-black hover:bg-zinc-100 focus:outline-none cursor-pointer w-full sm:w-auto"
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </button>
              </Link>
              <Link to={"/login"} className="w-full sm:w-fit">
                <button
                  type="button"
                  className="py-2 px-3 text-sm font-medium rounded-md bg-zinc-400 text-white hover:bg-zinc-500 focus:outline-none cursor-pointer w-full sm:w-auto"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
