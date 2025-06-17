import { Link } from "react-router";
const Map = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-sky-600 py-5 px-4 sm:px-8 md:px-20 min-h-[400px] sm:min-h-[600px]">
      <div className="flex flex-col items-center justify-center p-3 w-full max-w-md gap-6 sm:gap-10">
        <h1 className="text-white font-poppins text-2xl sm:text-3xl font-bold text-center">
          Connect and Share your Tidbits
        </h1>
        <p className="text-sm sm:text-md font-poppins font-semibold text-white text-center">
          Blogging isn't just about sharing your thoughts—it's about connecting
          with people who share your interests. With every post, you spark
          conversations, inspire ideas, and build a community that engages with
          your content. Whether through comments, shares, or collaborations,
          your blog becomes a space where meaningful connections thrive.
        </p>
        <Link to={"create"}>
          <button className="bg-pink-500 p-3 w-full sm:w-auto hover:scale-105 transition duration-150 font-poppins text-lg sm:text-2xl text-white font-bold hover:bg-pink-600 rounded-md cursor-pointer">
            CREATE YOUR BLOG
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Map;
