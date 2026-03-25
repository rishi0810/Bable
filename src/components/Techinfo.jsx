import img2 from "../assets/pen.avif";

const Techinfo = () => {
  return (
    <div className="px-5 sm:px-6 py-14 sm:py-20 max-w-3xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="relative order-2 md:order-1">
          <img
            src={img2}
            alt="Creativity"
            className="w-full aspect-[4/3] object-cover rounded-xl"
          />
        </div>
        <div className="space-y-5 order-1 md:order-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-ed-accent font-sans-ui font-medium">
            Expression
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-ed-text leading-tight tracking-tight">
            Creativity
            <br />
            Unleashed
          </h2>
          <p className="font-body text-ed-text-secondary text-[15px] sm:text-base leading-relaxed">
            Creativity in blogging is about presenting ideas in ways that
            captivate and surprise. Through compelling storytelling, striking
            visuals, and a distinct voice, your content transcends the ordinary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Techinfo;
