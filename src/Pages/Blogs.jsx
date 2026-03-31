import TopResults from "../components/TopResults.jsx";
import Search from "../components/Search.jsx";
import { useState, useEffect } from "react";
import { buildApiUrl } from "../lib/api.js";

const CACHE_KEY = "blogs";
const CACHE_TIME_KEY = "blogs_timestamp";

const readCachedBlogs = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const cachedValue = window.localStorage.getItem(CACHE_KEY);
    return cachedValue ? JSON.parse(cachedValue) : [];
  } catch (error) {
    console.error("Failed to read cached blogs:", error);
    window.localStorage.removeItem(CACHE_KEY);
    return [];
  }
};

const Blogs = () => {
  const [results, setResults] = useState(readCachedBlogs);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAndUpdate = async () => {
      try {
        const response = await fetch(buildApiUrl("/blog"), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch blogs: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("Unable to fetch blogs");
          return;
        }

        const reversedBlogs = [...data].reverse();
        const serializedBlogs = JSON.stringify(reversedBlogs);
        const currentCache = window.localStorage.getItem(CACHE_KEY);

        if (serializedBlogs === currentCache) {
          return;
        }

        window.localStorage.setItem(CACHE_KEY, serializedBlogs);
        window.localStorage.setItem(
          CACHE_TIME_KEY,
          Date.now().toString()
        );
        setResults(reversedBlogs);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("Fetch error:", error);
      }
    };

    fetchAndUpdate();

    return () => {
      controller.abort();
    };
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
