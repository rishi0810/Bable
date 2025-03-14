import React, { useEffect, useState } from "react";
import { Link } from "react-router";
const Search = ({ results, setblogid }) => {
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
    <>
      <div className="relative w-2/5">
        <input
          type="search"
          className="border border-zinc-600 w-full p-2 rounded bg-zinc-100"
          value={query}
          onChange={handleevent}
          placeholder="search for any topic......"
        />
        {filtereddata.length > 0 && (
          <div className="absolute left-0 right-0 border border-zinc-300 shadow-lg mt-1 rounded max-h-60 overflow-y-auto bg-zinc-50">
            {filtereddata.map((result, index) => (
              <Link to={"blog"} state={{blogid : result._id}}>
              <li key={index} className="p-2 hover:bg-zinc-100 cursor-pointer">
               {result.heading}
              </li>
          
              </Link>
                ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
