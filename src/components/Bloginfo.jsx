import img1 from "../assets/bloglaptop.avif";
const Bloginfo = () => {
  return (
    <div className="px-4 sm:px-8 md:px-14 flex flex-col md:flex-row justify-center md:space-x-20 space-y-8 md:space-y-0 overflow-hidden bg-orange-400 items-center">
      <div className="p-2 flex flex-col justify-center space-y-4 max-w-xl">
        <h1 className="text-white font-bold font-poppins text-3xl sm:text-4xl">
          Blog
        </h1>
        <p className="font-semibold text-white text-sm sm:text-md font-poppins text-justify">
          A <span className="bg-red-500 px-2 py-1 skew-6">blog</span> is an
          online platform where individuals or organizations share thoughts,
          information, or experiences on various topics. It typically consists
          of regularly updated posts, often written in an informal or
          conversational style. Blogs can cover anything from personal stories
          to professional insights, helping engage audiences and share
          knowledge.
        </p>
      </div>

      <img
        src={img1}
        alt="blog"
        className="w-4/5 sm:w-2/3 md:w-2/5 rotate-6 rounded-lg max-w-xs md:max-w-none"
      />
    </div>
  );
};

export default Bloginfo;
