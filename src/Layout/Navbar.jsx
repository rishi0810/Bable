import React from "react";
import { Newspaper } from "lucide-react";
import ppic from "../assets/ag.jpg";
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <header className="sticky top-0 flex flex-row justify-between items-center py-3 px-10 mx-auto z-100 border-b border-slate-800 bg-white">
      <Link to={"/"} className="flex items-center gap-2">
        <Newspaper className="size-7" />
        <h3 className="font-bold text-2xl">Bable</h3>
      </Link>

      <div className="text-2xl text-center font-poppins font-bold text-zinc-700">
        Interesting Conversations and Tidbits of Knowledge
      </div>
      <div className="flex gap-2">
       <span className="p-1 space-x-2">
       <Link to={"/signup"} className="rounded-sm p-2 hover:bg-zinc-200 active:bg-zinc-300 cursor-pointer font-semibold">
          Sign Up
        </Link>
        <Link to={"/login"} className="bg-zinc-300 rounded-sm p-2 hover:bg-zinc-400 hover:text-white cursor-pointer font-semibold">
          Login
        </Link>
       </span>
        <img src={ppic} alt="profile" className="rounded-full size-8" />
      </div>
    </header>
  );
};

export default Navbar;
