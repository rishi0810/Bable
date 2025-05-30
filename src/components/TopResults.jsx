import React, { useEffect, useState } from "react";
import { Link } from "react-router";
const TopResults = ({ results }) => {
  const [sortedlist, setsortedlist] = useState([]);

  useEffect(() => {
    const sorting = () => {
      const newArray = [...results].slice(0, 8);
      if (newArray) setsortedlist(newArray);
      else console.error("Unable to fetch");
    };
    sorting();
  }, [results]);

  return (
    <>
       {sortedlist ? (
        <div className="grid grid-cols-4 w-full mx-auto gap-5 mb-10 justify-center">
          {sortedlist.map((item) => {
            return (
              <Link
                to={"/blog"}
                state={{ blogid: item._id }}
                // className="w-1/5"
                key={item._id}
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:scale-105 transition duration-150 ease-in cursor-pointer flex flex-col h-80">
                  <img
                    className="w-full h-4/6 object-cover"
                    src={item.img_url}
                    alt=""
                  />
                  <div className="p-4 flex-grow flex">
                    <h2 className="text-md font-semibold text-zinc-800 font-poppins">
                      {item.heading}
                    </h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center font-bold font-poppins">
          Loading.....
        </div>
      )}
    </>
  );
};

export default TopResults;
