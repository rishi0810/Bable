import React, { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import image from "../assets/logo.avif";
import toast from "react-hot-toast";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const navigate = useNavigate();
  const [isloggedin, setisloggedin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const checkAuth = async () => {
    const response = await fetch("https://bable-backend.vercel.app/user/authcheck", {
      method: "GET",
      credentials: "include",
    });
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

  const handlelogout = async (e) => {
    try {
      const response = await fetch("https://bable-backend.vercel.app/user/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setTimeout(() => {
          toast.success("Logged out successfully!", { duration: 1000 });
          setTimeout(() => {
            navigate("/login");
            window.location.reload();
          }, 1500);
        }, 500);
      }
    } catch (err) {
      toast.error("Failed to logout...");
      console.error("Error + ", err);
    }
  };

  return (
    <header className="sticky top-0 w-full py-2 px-4 sm:px-8 bg-white z-50 shadow-md">
      <nav className="flex items-center w-full justify-between">
        <div className="flex items-center gap-2">
          <img src={image} alt="" className="size-8 rounded-full" />
          <h3 className="font-bold text-xl sm:text-2xl">Bable</h3>
        </div>
        <button className="sm:hidden ml-auto text-3xl p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
        <div className={`flex-col sm:flex-row flex items-center gap-x-7 gap-y-2 mx-auto absolute sm:static top-14 left-0 w-full sm:w-auto bg-white sm:bg-transparent shadow-md sm:shadow-none transition-all duration-200 z-40 ${menuOpen ? "flex" : "hidden sm:flex"}`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative inline-block text-black px-3 py-2 ${
                isActive ? "border-b-2 border-lime-400" : "hover:text-zinc-600"
              }`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to= {isloggedin ? "/create" : "/login"}
            className={({ isActive }) =>
              `relative inline-block text-black px-3 py-2 ${
                isActive ? "border-b-2 border-lime-400" : "hover:text-zinc-600"
              }`
            }
          >
            Create
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              `relative inline-block text-black px-3 py-2 ${
                isActive ? "border-b-2 border-lime-400" : "hover:text-zinc-600"
              }`
            }
          >
            Blog
          </NavLink>
       

          {isloggedin ? (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `relative inline-block text-black px-3 py-2 ${
                  isActive
                    ? "border-b-2 border-lime-400"
                    : "hover:text-zinc-600"
                }`
              }
            >
              Profile
            </NavLink>
          ) : null}

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative inline-block text-black px-3 py-2 ${
                isActive ? "border-b-2 border-lime-400" : "hover:text-zinc-600"
              }`
            }
          >
            About
          </NavLink>
          {isloggedin ? (
            <button
              className="bg-zinc-300 rounded-sm p-2 w-full sm:w-auto hover:bg-zinc-400 hover:text-white cursor-pointer font-semibold"
              onClick={() => { setMenuOpen(false); handlelogout(); }}
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <Link to={"/signup"}>
                <button
                  type="button"
                  className="py-2 px-3 text-sm font-medium rounded-md bg-white shadow-md text-black hover:bg-zinc-100 focus:outline-none cursor-pointer w-full sm:w-auto"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign up
                </button>
              </Link>
              <Link to={"/login"}>
                <button
                  type="button"
                  className="py-2 px-3 text-sm font-medium rounded-md bg-zinc-400 text-white hover:bg-zinc-500 focus:outline-none cursor-pointer w-full sm:w-auto"
                  onClick={() => setMenuOpen(false)}
                >
                  Log in
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
