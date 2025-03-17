import React from "react";
import {Link } from "react-router";
const Hero = () => {
  return (
    <div className="text-center px-20 pt-10 pb-5 font-poppins">
      <h1 className="text-5xl font-bold">
        <span className="text-zinc-700">Bable</span> – Write. Share. Inspire.
      </h1>
      <p className="text-lg text-zinc-700 mt-4 max-w-2xl mx-auto">
        Unleash your thoughts with Bable – the blogging platform where ideas
        flow freely. Share your stories, engage with a like-minded community,
        and make your voice heard.
      </p>
      <div className="w-full flex items-center justify-center space-x-5">
      <Link to={"create"} >
        <button
          className="mt-6 px-6 py-3 bg-zinc-700 text-white text-lg font-semibold rounded-lg shadow hover:bg-zinc-800 cursor-pointer hover:scale-105 transition duration-150"
        >
          CREATE YOUR BLOG
        </button>
        </Link>
        <Link to={"blogs"} >
        <button
          className="mt-6 px-6 py-3 bg-zinc-100 text-lg font-semibold rounded-lg shadow-md hover:bg-zinc-200 cursor-pointer hover:scale-105 transition duration-150"
        >
            EXPLORE BLOGS
        </button>
        </Link>
      </div>
      
    </div>
  );
};

export default Hero;
