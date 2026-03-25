import TopResults from "../components/TopResults.jsx";
import Search from "../components/Search.jsx";
import { useState, useEffect } from "react";

const Blogs = () => {
  const [results, setresults] = useState([]);

  useEffect(() => {
    const CACHE_KEY = "blogs";
    const CACHE_TIME_KEY = "blogs_timestamp";

    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      setresults(parsed);
    }

    const fetchAndUpdate = async () => {
      try {
        const response = await fetch("https://bable-backend.vercel.app/blog");
        const data = await response.json();

        if (data) {
          const reversed = data.reverse();
          const currentCache = localStorage.getItem(CACHE_KEY);
          const isDifferent =
            !currentCache ||
            JSON.stringify(reversed) !==
              JSON.stringify(JSON.parse(currentCache));

          if (isDifferent) {
            console.log("New blog data detected, updating...");
            localStorage.setItem(CACHE_KEY, JSON.stringify(reversed));
            localStorage.setItem(
              CACHE_TIME_KEY,
              new Date().getTime().toString()
            );
            setresults(reversed);
          } else {
            console.log("No change in blog data.");
          }
        } else {
          console.error("Unable to fetch blogs");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchAndUpdate();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-10 sm:pt-16 pb-6">
        <div className="text-center space-y-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-ed-accent font-sans-ui font-medium">
            Archive
          </span>
          <h1 className="font-display text-3xl sm:text-4xl text-ed-text tracking-tight">
            Stories &amp; Ideas
          </h1>
          <p className="font-body text-ed-text-secondary text-[15px] max-w-sm mx-auto leading-relaxed">
            Explore thoughts and narratives from our community of writers.
          </p>
        </div>
      </div>

      <section>
        <Search results={results} />
      </section>

      <section className="pb-16">
        <TopResults results={results} />
      </section>
    </div>
  );
};

export default Blogs;
