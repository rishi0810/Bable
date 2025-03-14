import React, { useState, useEffect } from "react";
import { Newspaper } from "lucide-react";
import ppic from "../assets/ag.jpg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isloggedin, setisloggedin] = useState(false);

  const checkAuth = async () => {
    const response = await fetch("/api/user/authcheck", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);
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
    await fetch("/api/user/logout", {
      method: "POST",
      credentials: "include",
    });

    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 flex flex-row justify-between items-center py-3 px-10 mx-auto z-100 border-b border-slate-800 bg-white">
      <Link to={"/"} className="flex items-center gap-2">
        <Newspaper className="size-7" />
        <h3 className="font-bold text-2xl">Bable</h3>
      </Link>

      <div className="text-2xl text-center font-poppins font-bold text-zinc-700">
        Interesting Conversations and Tidbits of Knowledge
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
        <div className="flex gap-2">
          <span className="p-1 space-x-2">
            <Link
              to={"/signup"}
              className="rounded-sm p-2 hover:bg-zinc-200 active:bg-zinc-300 cursor-pointer font-semibold"
            >
              Sign Up
            </Link>
            <Link
              to={"/login"}
              className="bg-zinc-300 rounded-sm p-2 hover:bg-zinc-400 hover:text-white cursor-pointer font-semibold"
            >
              Login
            </Link>
          </span>
        </div>
      )}
    </header>
  );
};

export default Navbar;
