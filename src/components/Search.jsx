import React, { useEffect, useState } from "react";
import { Link } from "react-router";
const Search = ({ results }) => {
  const [query, setquery] = useState("");
  const [filtereddata, setfiltereddata] = useState([]);
  const handleevent = (e) => {
    const newData = e.target.value;
    setquery(newData);
  };

  useEffect(() => {
    const filtering = async () => {
      if (query.trim() === "") {
        setfiltereddata([]);
        return;
      }
      try {
        const filterapply = results.filter((obj) =>
          obj.heading.toLowerCase().includes(query.toLowerCase())
        );
        setfiltereddata(filterapply);
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };
    filtering();
  }, [query]);

  return (
    <div>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative mx-auto max-w-4xl grid space-y-5 sm:space-y-10">
          <div className="text-center">
            <h1 className="text-3xl text-gray-800 font-bold sm:text-5xl lg:text-6xl lg:leading-tight">
              Search for a {" "}
              <span className="text-zinc-600">variety</span> of topics
            </h1>
          </div>

          <form>
            <div className="mx-auto max-w-2xl sm:flex sm:space-x-3 p-3 bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-100">
              <div className="w-full pb-2 sm:pb-0">
                
                <input
                  type="search"
                  className="py-2.5 sm:py-3 px-4 block w-full border-transparent rounded-lg rounded-b-none sm:text-sm focus:border-zinc-500 focus:ring-zinc-500"
                  placeholder="search for any topic...."
                  value={query}
                  onChange={handleevent}
                />
              </div>
              {filtereddata.length > 0 && (
                <ul className="absolute left-20 right-23 border top-42 border-zinc-300 shadow-lg mt-1 rounded rounded-t-none max-h-60 overflow-y-auto bg-zinc-50">
                {filtereddata.map((result, index) => (
                  <Link to={"/blog"} state={{blogid : result._id}}>
                  <li key={index} className="p-2 hover:bg-zinc-100 cursor-pointer">
                  {result.heading}
                  </li>

                  </Link>
                    ))}
                </ul>
              )}
          
            </div>
          </form>
        </div>
      </div>
    </div>
    // <>
    //   <div className="relative w-2/5">
    //     <input
    //       type="search"
    //       className="border border-zinc-600 w-full p-2 rounded bg-zinc-100"
    //       value={query}
    //       onChange={handleevent}
    //       placeholder="search for any topic......"
    //     />
        // {filtereddata.length > 0 && (
        //   <ul className="absolute left-0 right-0 border border-zinc-300 shadow-lg mt-1 rounded max-h-60 overflow-y-auto bg-zinc-50">
        //     {filtereddata.map((result, index) => (
        //       <Link to={"/blog"} state={{blogid : result._id}}>
        //       <li key={index} className="p-2 hover:bg-zinc-100 cursor-pointer">
        //        {result.heading}
        //       </li>

        //       </Link>
        //         ))}
        //   </ul>
        // )}
    //   </div>
    // </>
  );
};

export default Search;
