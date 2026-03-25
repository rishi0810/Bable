import Bloginfo from "../components/Bloginfo.jsx";
import Techinfo from "../components/Techinfo.jsx";
import Map from "../components/Map.jsx";
import Hero from "../components/Hero.jsx";

const Home = () => {
  return (
    <div className="min-h-screen">
      <section>
        <Hero />
      </section>

      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <div className="h-px bg-ed-border" />
      </div>

      <section>
        <Bloginfo />
      </section>

      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <div className="h-px bg-ed-border" />
      </div>

      <section>
        <Techinfo />
      </section>

      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <div className="h-px bg-ed-border" />
      </div>

      <section>
        <Map />
      </section>
    </div>
  );
};

export default Home;
