import React from "react";

const Footer = () => {
  return (
    <footer className="relative bottom-0 py-2 px-10 w-full text-center mt-1">
      <div className="flex items-center justify-between px-10">
        <p className="text-lg font-poppins">
          @{new Date().getFullYear()} Bable. All rights reserved.
        </p>
        <div className="flex gap-4">
          <span className="p-1 text-md font-poppins text-center">
            Content Policy
          </span>
          <span className="p-1 text-md font-poppins text-center">
            Privacy Policy
          </span>
          <span className="p-1 text-md font-poppins text-center">
            Contribute
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
