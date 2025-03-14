import React from "react";
import img2 from "../assets/pen.jpg";
const Techinfo = () => {
  return (
    <div className="px-14 flex justify-center space-x-60 overflow-hidden bg-red-400">
      <img src={img2} alt="" className="size-2/5 -rotate-6 rounded-lg" />
      <div className="p-2 flex flex-col justify-center space-y-4">
        <h1 className="text-white font-bold font-poppins text-4xl text-right">
          Creativity
        </h1>
        <p className="font-semibold text-white text-md font-poppins text-justify">
          <span className="bg-purple-500 px-2 py-1">Creativity</span> in
          blogging is about presenting ideas in a unique and engaging way that
          captures the reader’s interest. It involves using compelling
          storytelling, eye-catching visuals, and a distinct voice to make
          content stand out. Creative blogs often experiment with different
          formats, such as infographics, interactive elements, or multimedia, to
          enhance the reader’s experience.
        </p>
      </div>
    </div>
  );
};

export default Techinfo;
