import React from "react";

const Footer = () => {
  return (
    <footer className="relative bottom-0 py-2 px-4 sm:px-10 w-full text-center mt-1 bg-white border-t">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 px-0 sm:px-10">
        <p className="text-base sm:text-lg font-poppins mb-1 sm:mb-0">
          @{new Date().getFullYear()} Bable. All rights reserved.
        </p>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
          <span className="p-1 text-sm sm:text-md font-poppins text-center">
            Content Policy
          </span>
          <span className="p-1 text-sm sm:text-md font-poppins text-center">
            Privacy Policy
          </span>
          <span className="p-1 text-sm sm:text-md font-poppins text-center">
            Contribute
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
