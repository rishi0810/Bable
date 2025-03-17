import React from "react";
import TopResults from "../components/TopResults";
import Search from "../components/Search";
import { useState, useEffect } from "react";
const Blogs = () => {
  const [results, setresults] = useState([]);
  useEffect(() => {
    const fetching = async () => {
      const response = await fetch("/api/blog/");
      const data = await response.json();
      if (data) setresults(data);
      else console.error("Unable to fetch");
    };
    fetching();
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <section className="p-10 w-5/6 flex justify-center border-b border-zinc-600 mb-10">
        <Search results={results} />
      </section>
      <section className="p-10 w-5/6 flex justify-center border-b border-zinc-600 mb-10">
        <TopResults results={results} />
      </section>
    </div>
  );
};

export default Blogs;
