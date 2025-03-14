import React, { useEffect, useState } from "react";
import Search from "../components/Search.jsx";
import TopResults from "../components/TopResults.jsx";
import Bloginfo from "../components/BlogInfo.jsx";
import Techinfo from "../components/Techinfo.jsx";
import Map from "../components/Map.jsx";


const Home = ({setblogid}) => {
  const [results, setresults] = useState([]);
  useEffect(() => {
    const fetching = async () => {
      const response = await fetch("/api/todos/");
      const data = await response.json();
      if (data) setresults(data);
      else console.error("Unable to fetch");
    };
    fetching();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <section className="p-10 w-5/6 flex justify-center border-b border-zinc-600 mb-10">
        <Search results={results} setblogid = {setblogid} />
      </section>
      <section className="p-2 w-5/6 border-b border-zinc-600 mb-10">
        <TopResults results={results} setblogid={setblogid} />
      </section>
      <section className="w-full border-b border-zinc-600">
        <Bloginfo />
        <Techinfo />
        <Map />
      </section>
      <div className="w-5/6 bg-zinc-600 h-[1px] my-1"></div>
    </div>
  );
};

export default Home;
