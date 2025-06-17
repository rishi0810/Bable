import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const words = ["Write", "Share", "Inspire"];
const TypingEffect = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length - 1));
      }, 80);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
      }, 150);
    }

    if (!isDeleting && displayText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), 1000);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index]);

  return (
    <span className="ml-2 text-zinc-700 font-semibold">
      – {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Hero = () => {
  const [isloggedin, setisloggedin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch(
        "https://bable-backend.vercel.app/user/authcheck",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setisloggedin(data.Authenticated);
    };
    checkAuth();
  }, []);

  const handleCreateClick = () => {
    navigate(isloggedin ? "/create" : "/login");
  };

  return (
    <div className="text-center px-4 sm:px-8 md:px-20 pt-10 pb-6 font-poppins bg-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-800 inline-flex flex-wrap justify-center items-center">
        <span className="whitespace-nowrap">
          Bable <TypingEffect />
        </span>
      </h1>

      <p className="text-base sm:text-lg text-zinc-600 mt-4 max-w-2xl mx-auto">
        Unleash your thoughts with Bable – the blogging platform where ideas
        flow freely. Share your stories, engage with a like-minded community,
        and make your voice heard.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handleCreateClick}
          className="px-6 py-3 bg-zinc-800 text-white text-base sm:text-lg font-semibold rounded-lg shadow hover:bg-zinc-900 hover:scale-105 transition duration-200 w-full sm:w-auto"
        >
          CREATE YOUR BLOG
        </button>
        <Link to="/blogs">
          <button className="px-6 py-3 bg-zinc-100 text-zinc-800 text-base sm:text-lg font-semibold rounded-lg shadow hover:bg-zinc-200 hover:scale-105 transition duration-200 w-full sm:w-auto">
            EXPLORE BLOGS
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
