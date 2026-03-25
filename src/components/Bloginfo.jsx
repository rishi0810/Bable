import img1 from "../assets/bloglaptop.avif";

const Bloginfo = () => {
  return (
    <div className="px-5 sm:px-6 py-14 sm:py-20 max-w-3xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-5">
          <span className="text-[10px] tracking-[0.3em] uppercase text-ed-accent font-sans-ui font-medium">
            The Craft
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-ed-text leading-tight tracking-tight">
            The Art of
            <br />
            Blogging
          </h2>
          <p className="font-body text-ed-text-secondary text-[15px] sm:text-base leading-relaxed">
            A blog is more than words on a screen &mdash; it is a canvas for
            thought. From personal reflections to professional insights, blogging
            invites you to share your perspective with the world.
          </p>
        </div>
        <div className="relative">
          <img
            src={img1}
            alt="Blogging"
            className="w-full aspect-[4/3] object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Bloginfo;
