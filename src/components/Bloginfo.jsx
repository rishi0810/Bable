import React from "react";
import img1 from "../assets/bloglaptop.jpg";
const Bloginfo = () => {
  return (
    <div className="px-14 flex justify-center space-x-60 overflow-hidden bg-orange-400">
      <div className="p-2 flex flex-col justify-center space-y-4">
        <h1 className="text-white font-bold font-poppins text-4xl">Blog</h1>
        <p className="font-semibold text-white text-md font-poppins text-justify">
          A <span className="bg-red-500 px-2 py-1 skew-6">blog</span> is an
          online platform where individuals or organizations share thoughts,
          information, or experiences on various topics. It typically consists
          of regularly updated posts, often written in an informal or
          conversational style. Blogs can cover anything from personal stories
          to professional insights, helping engage audiences and share
          knowledge.
        </p>
      </div>

      <img src={img1} alt="" className="size-2/5 rotate-6 rounded-lg" />
    </div>
  );
};

export default Bloginfo;
