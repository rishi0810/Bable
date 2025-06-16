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
    <div className="min-h-screen flex flex-col gap-2 px-2 sm:px-5">
      <section className="mb-5">
        <Search results={results} />
      </section>
      <section className="mb-10">
        <TopResults results={results} />
      </section>
    </div>
  );
};

export default Blogs;
