import React from "react";
import img2 from "../assets/pen.avif";
const Techinfo = () => {
  return (
    <div className="px-4 sm:px-8 md:px-14 flex flex-col md:flex-row justify-center md:space-x-20 space-y-8 md:space-y-0 overflow-hidden bg-red-400 items-center">
      <img src={img2} alt="" className="w-4/5 sm:w-2/3 md:w-2/5 -rotate-6 rounded-lg max-w-xs md:max-w-none" />
      <div className="p-2 flex flex-col justify-center space-y-4 max-w-xl">
        <h1 className="text-white font-bold font-poppins text-3xl sm:text-4xl text-right">Creativity</h1>
        <p className="font-semibold text-white text-sm sm:text-md font-poppins text-justify">
          <span className="bg-purple-500 px-2 py-1">Creativity</span> in
          blogging is about presenting ideas in a unique and engaging way that
          captures the reader's interest. It involves using compelling
          storytelling, eye-catching visuals, and a distinct voice to make
          content stand out. Creative blogs often experiment with different
          formats, such as infographics, interactive elements, or multimedia, to
          enhance the reader's experience.
        </p>
      </div>
    </div>
  );
};

export default Techinfo;
