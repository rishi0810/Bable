import React from "react";
import Bloginfo from "../components/Bloginfo.jsx";
import Techinfo from "../components/Techinfo.jsx";
import Map from "../components/Map.jsx";
import Hero from "../components/Hero.jsx";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 pt-15">
      <section className="p-10 w-5/6 flex justify-center border-b border-zinc-600 mb-10">
        <Hero />
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
