import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className="w-full bg-white border-t py-4 px-4 sm:px-10 mt-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <p className="text-sm sm:text-base text-gray-600 text-center font-poppins">
          &copy; {new Date().getFullYear()} <span className="font-semibold">Bable</span>. All rights reserved.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-center">
          <Link to={'/policy'} className="text-sm text-gray-600 hover:text-black transition duration-150 font-poppins">
            Content Policy
          </Link>
          <Link to={'/prpolicy'} className="text-sm text-gray-600 hover:text-black transition duration-150 font-poppins">
            Privacy Policy
          </Link>
          <a href = "https://github.com/rishi0810/Bable" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-black transition duration-150 font-poppins">
            Contribute
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
