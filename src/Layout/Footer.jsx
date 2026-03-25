import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="border-t border-ed-border transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
          <div className="text-center sm:text-left">
            <span className="font-display text-lg text-ed-text tracking-tight">
              Bable
            </span>
            <p className="text-[11px] tracking-[0.12em] uppercase text-ed-text-tertiary font-sans-ui mt-1">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          <div className="flex items-center gap-5 sm:gap-6">
            <Link
              to="/policy"
              className="text-[11px] tracking-[0.12em] uppercase font-sans-ui font-medium text-ed-text-tertiary hover:text-ed-text transition-colors duration-200"
            >
              Content Policy
            </Link>
            <Link
              to="/prpolicy"
              className="text-[11px] tracking-[0.12em] uppercase font-sans-ui font-medium text-ed-text-tertiary hover:text-ed-text transition-colors duration-200"
            >
              Privacy
            </Link>
            <a
              href="https://github.com/rishi0810/Bable"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.12em] uppercase font-sans-ui font-medium text-ed-text-tertiary hover:text-ed-text transition-colors duration-200"
            >
              Contribute
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
