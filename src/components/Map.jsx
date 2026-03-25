import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const Map = () => {
  return (
    <div className="py-16 sm:py-24 px-5 sm:px-6 bg-ed-surface transition-colors duration-300">
      <div className="max-w-lg mx-auto text-center space-y-6">
        <span className="text-[10px] tracking-[0.3em] uppercase text-ed-accent font-sans-ui font-medium">
          Community
        </span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-ed-text leading-tight tracking-tight">
          Connect Through Words
        </h2>
        <p className="font-body text-ed-text-secondary text-[15px] sm:text-base leading-relaxed">
          Every post sparks a conversation. Every story builds a bridge. Join a
          community where meaningful ideas find their audience.
        </p>
        <div className="pt-2">
          <Link to="/create">
            <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-ed-accent text-white text-[13px] tracking-wide font-sans-ui font-medium hover:bg-ed-accent-hover transition-colors duration-200 cursor-pointer">
              Begin Your Story
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Map;
