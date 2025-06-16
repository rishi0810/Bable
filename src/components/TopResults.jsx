import { useEffect, useState } from "react";
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
      {sortedlist.length > 0 ? (
        <div className="max-w-4xl mx-auto mb-20 space-y-5">
          {sortedlist.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <Link to={`/blog/${item._id}`} key={item._id}>
                <article className="group bg-white hover:bg-gray-50/50 rounded-2xl overflow-hidden border border-transparent hover:border-gray-200 transition-all duration-300 ease-out hover:shadow-md mb-5">
                  <div
                    className={`flex ${
                      isEven ? "flex-row bg-zinc-100/80" : "flex-row-reverse"
                    } gap-6 p-6 `}
                  >
                    <div className="flex-shrink-0 w-56 h-36">
                      <img
                        className="w-full h-full object-cover rounded-xl bg-gray-100"
                        src={item.img_url}
                        alt={item.heading}
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors">
                          {item.heading}
                        </h2>

                        {item.author.name && (
                          <p className="text-gray-600 text-base leading-relaxed line-clamp-2">
                            {item.author.name}
                          </p>
                        )}
                        <p className="text-gray-400 text-sm">
                          {new Date(item.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      ) : (
        <div
          className={`flex flex-col items-center mx-auto mb-20 space-y-5 max-w-4xl`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`
                animate-pulse flex justify-center h-36 w-full overflow-hidden rounded-xl shadow-lg border border-gray-200
                ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              `}
            >
              <div className="sm:w-48 flex-shrink-0 bg-gray-300 h-full"></div>

              <div className="p-4 sm:p-5 flex-grow flex flex-col justify-center space-y-3">
                <div className="h-5 bg-gray-300 rounded w-4/5"></div>{" "}
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>{" "}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TopResults;
