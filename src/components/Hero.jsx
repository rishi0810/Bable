import React from "react";
import { Link } from "react-router";
const Hero = () => {
  return (
    <div className="text-center px-4 sm:px-8 md:px-20 pt-8 sm:pt-10 pb-5 font-poppins">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        <span className="text-zinc-700">Bable</span> – Write. Share. Inspire.
      </h1>
      <p className="text-base sm:text-base text-zinc-700 mt-4 max-w-2xl mx-auto">
        Unleash your thoughts with Bable – the blogging platform where ideas
        flow freely. Share your stories, engage with a like-minded community,
        and make your voice heard.
      </p>
      <div className="w-full flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5">
        <Link to={"create"}>
          <button className="mt-6 sm:mt-6 px-6 py-3 bg-zinc-700 text-white text-lg font-semibold rounded-lg shadow hover:bg-zinc-800 cursor-pointer hover:scale-105 transition duration-150 w-full sm:w-auto">
            CREATE YOUR BLOG
          </button>
        </Link>
        <Link to={"blogs"}>
          <button className="mt-0 sm:mt-6 px-6 py-3 bg-zinc-100 text-lg font-semibold rounded-lg shadow-md hover:bg-zinc-200 cursor-pointer hover:scale-105 transition duration-150 w-full sm:w-auto">
            EXPLORE BLOGS
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
