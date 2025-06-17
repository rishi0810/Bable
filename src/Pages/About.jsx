import pfp from "../assets/pfp.avif";

const About = () => {
  return (
    <div className="min-h-screen px-4 py-16 flex justify-center bg-gray-50 font-poppins">
      <div className="w-full max-w-3xl bg-white  p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-zinc-300 shadow-sm object-cover"
            src={pfp}
            alt="Rishi Raj"
          />
          <div className="text-center sm:text-left mt-2">
            <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-800">
              Rishi Raj
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600">
              Web Developer & College Student
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4 text-[15px] sm:text-base text-gray-700 leading-relaxed">
          <p>
            I am a learning developer aiming to create appealing and
            user-centric web designs and backend logic. My interest spans across
            UI design, system design, and backend logic flow including request
            handling, REST APIs, and database manipulation. I aim to work in a
            professional infrastructure to bring digital visions to life.
          </p>
          <p>
            Currently, I build projects and develop my skills—designing UI
            templates, converting them into React + Express architectures, and
            ensuring a great user experience. I am passionate about crafting
            functional, logically sound designs that enhance usability.
          </p>
        </div>

        <ul className="mt-8 space-y-4">
          <li className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#2563eb"
              viewBox="0 0 310 310"
            >
              <path d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73C77.16,101.969,74.922,99.73,72.16,99.73z" />
              <path d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z" />
              <path d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995C310,145.43,300.549,94.761,230.454,94.761z" />
            </svg>
            <a
              className="text-zinc-600 hover:text-black underline underline-offset-2"
              href="https://www.linkedin.com/in/rishiraj2003/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @rishiraj2003
            </a>
          </li>
          <li className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#1f2937"
              viewBox="0 0 24 24"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.17c-3.338.725-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.304-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3-.404c1.02.005 2.045.137 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.48 5.921.43.371.823 1.102.823 2.222v3.293c0 .32.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <a
              className="text-zinc-600 hover:text-black underline underline-offset-2"
              href="https://github.com/rishi0810"
              target="_blank"
              rel="noopener noreferrer"
            >
              @rishi0810
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
