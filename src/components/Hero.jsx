import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { ArrowRight } from "lucide-react";

const TYPING_WORDS = ["Write", "Share", "Inspire"];

const TypingEffect = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPING_WORDS[index];
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
      setIndex((prev) => (prev + 1) % TYPING_WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index]);

  return (
    <span
      className="text-ed-accent inline-block font-display italic"
      style={{ minWidth: "7ch" }}
    >
      {displayText}
      <span className="animate-pulse text-ed-text-tertiary not-italic">|</span>
    </span>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  const handleCreateClick = () => {
    if (loading) return;
    navigate(isAuthenticated ? "/create" : "/login");
  };

  return (
    <div className="text-center px-5 sm:px-6 py-16 sm:py-24 md:py-32 max-w-2xl mx-auto">
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ed-text leading-[0.95] tracking-tight">
        Bable
      </h1>

      <div className="mt-5 font-display text-xl sm:text-2xl md:text-3xl text-ed-text-secondary">
        <TypingEffect />
      </div>

      <p className="text-[15px] sm:text-base text-ed-text-secondary mt-8 max-w-sm mx-auto font-body leading-relaxed">
        A sanctuary for the written word. Share your stories, engage with
        thoughtful minds, and let your voice resonate.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={handleCreateClick}
          disabled={loading}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-ed-text text-ed-bg text-[13px] tracking-wide font-sans-ui font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto justify-center"
        >
          Start Writing
          <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
        <Link to="/blogs" className="w-full sm:w-auto">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[13px] tracking-wide font-sans-ui font-medium text-ed-text border border-ed-border hover:border-ed-text transition-all duration-200 cursor-pointer w-full justify-center">
            Read Stories
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
