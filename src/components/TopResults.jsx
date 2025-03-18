import React, { useEffect, useState } from "react";
import { Link } from "react-router";
const TopResults = ({ results }) => {
  const [sortedlist, setsortedlist] = useState([]);

  useEffect(() => {
    const sorting = () => {
      const newArray = [...results].slice(0, 5);
      if (newArray) setsortedlist(newArray);
      else console.error("Unable to fetch");
    };
    sorting();
  }, [results]);

  return (
    <>
      {sortedlist ? (
        <div className="flex w-full mx-auto gap-5 mb-10">
          {sortedlist.map((item) => {
            return (
              <Link
                to={"/blog"}
                state={{ blogid: item._id }}
                className="max-w-1/5 "
              >
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:scale-105 transition duration-150 ease-in cursor-pointer min-h-2/3"
                >
                  <img
                    className="w-full h-48 object-cover"
                    src={item.img_url}
                    alt=""
                  />
                  <div className="p-4">
                    <h2 className="text-md font-semibold text-zinc-800 text-center font-poppins line-clamp-1">
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
