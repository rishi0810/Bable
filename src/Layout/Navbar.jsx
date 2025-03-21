import React, { useState, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import image from "../assets/logo.png";
const Navbar = () => {
  const navigate = useNavigate();
  const [isloggedin, setisloggedin] = useState(false);

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

  const handleLogout = async () => {
    await fetch("https://bable-backend.vercel.app/user/logout", {
      method: "POST",
      credentials: "include",
    });

    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 flex justify-between items-center w-full py-2 px-8 bg-white z-50 shadow-md">
      <nav className="flex items-center w-full">
        <div className="flex items-center gap-2 ">
          <img src={image} alt="" className="size-8 rounded-full" />
          <h3 className="font-bold text-2xl">Bable</h3>
        </div>

        <div className="flex items-center gap-x-7 mx-auto">
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
            to="/create"
            className={({ isActive }) =>
              `relative inline-block text-black px-3 py-2 ${
                isActive ? "border-b-2 border-lime-400" : "hover:text-zinc-600"
              }`
            }
          >
            Blog
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
        </div>

        {isloggedin ? (
          <>
            <button
              className="bg-zinc-300 rounded-sm p-2 hover:bg-zinc-400 hover:text-white cursor-pointer font-semibold"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex items-center gap-x-2">
            <Link to={"/signup"}>
              <button
                type="button"
                className="py-2 px-3 text-sm font-medium rounded-md bg-white shadow-md text-black hover:bg-zinc-100 focus:outline-none cursor-pointer"
              >
                Sign up
              </button>
            </Link>
            <Link to={"/login"}>
              <button
                type="button"
                className="py-2 px-3 text-sm font-medium rounded-md bg-zinc-400 text-white hover:bg-zinc-500 focus:outline-none cursor-pointer"
              >
                Log in
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
