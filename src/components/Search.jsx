import { useEffect, useState, useCallback, useMemo, memo } from "react";
import { Link } from "react-router";

const Search = ({ results }) => {
  const [query, setquery] = useState("");
  const [filtereddata, setfiltereddata] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const debouncedSearch = useCallback((searchQuery, resultsArray) => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setfiltereddata([]);
        setIsLoading(false);
        return;
      }

      try {
        const filterapply = resultsArray.filter((obj) =>
          obj.heading.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setfiltereddata(filterapply);
      } catch (error) {
        console.error("Fetching error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  
  const memoizedResults = useMemo(() => results || [], [results]);

  const handleevent = useCallback((e) => {
    const newData = e.target.value;
    setquery(newData);
    
    if (newData.trim() !== "") {
      setIsLoading(true);
    }
  }, []);

  const handleShortcut = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      document.getElementById("search-input")?.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleShortcut);
    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, [handleShortcut]);

  useEffect(() => {
    const cleanup = debouncedSearch(query, memoizedResults);
    return cleanup;
  }, [query, memoizedResults, debouncedSearch]);

  const ShimmerItem = memo(() => (
    <li className="border-b border-gray-50 last:border-b-0">
      <div className="block px-4 py-3">
        <div className="flex items-start space-x-3 animate-pulse">
          <div className="flex-shrink-0 mt-1">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="flex-shrink-0">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </li>
  ));

  return (
    <div>
      <div className="max-w-[85rem] mx-auto px-2  sm:px-6 lg:px-8 py-10 sm:py-20">
        <div className="relative mx-auto max-w-4xl grid space-y-5 sm:space-y-10">
          <div className="relative ">
            <div
              className={`sm:flex sm:space-x-3 p-2 sm:p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 transition-all duration-300 mx-auto ${
                isSearchFocused
                  ? "border-zinc-400 shadow-xl"
                  : "border-gray-200"
              }`}
            >
              <div className="w-full pb-2 sm:pb-0 relative">
                <input
                  id="search-input"
                  type="text"
                  className="py-2 sm:py-3 pl-10 pr-20 block w-full border-transparent rounded-lg sm:text-sm focus:border-zinc-500 focus:ring-zinc-500 placeholder-gray-500 transition-all duration-200 text-base"
                  placeholder="Search for any topic..."
                  value={query}
                  onChange={handleevent}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() =>
                    setTimeout(() => setIsSearchFocused(false), 200)
                  }
                />

                <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
                  <div className="hidden sm:flex items-center space-x-1">
                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
                      {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}
                    </kbd>
                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
                      K
                    </kbd>
                  </div>
                </div>
              </div>
            </div>

            {(isLoading || filtereddata.length > 0) && (
              <div className="absolute left-0 right-0 top-full mt-2 z-50">
                <div className="bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-hidden">
                  <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm text-gray-600 font-medium">
                      {isLoading ? (
                        <span className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                          <span>Searching...</span>
                        </span>
                      ) : (
                        `${filtereddata.length} result${
                          filtereddata.length !== 1 ? "s" : ""
                        } found`
                      )}
                    </p>
                  </div>

                  <ul className="max-h-64 overflow-y-auto">
                    {isLoading ? (
                      
                      <>
                        <ShimmerItem />
                        <ShimmerItem />
                        <ShimmerItem />
                      </>
                    ) : (
                      filtereddata.map((result, index) => (
                        <li
                          key={index}
                          className="border-b border-gray-50 last:border-b-0"
                        >
                          <Link
                            to={`/blog/${result._id}`}
                            className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-150 group"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-1">
                                <svg
                                  className="h-4 w-4 text-gray-400 group-hover:text-gray-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 group-hover:text-zinc-700 line-clamp-2">
                                  {result.heading
                                    .split(new RegExp(`(${query})`, "gi"))
                                    .map((part, i) =>
                                      part.toLowerCase() ===
                                      query.toLowerCase() ? (
                                        <mark
                                          key={i}
                                          className="bg-yellow-200 px-1 rounded"
                                        >
                                          {part}
                                        </mark>
                                      ) : (
                                        part
                                      )
                                    )}
                                </p>
                                {result.excerpt && (
                                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                    {result.excerpt}
                                  </p>
                                )}
                              </div>

                              <div className="flex-shrink-0">
                                <svg
                                  className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>

                  {!isLoading && filtereddata.length > 5 && (
                    <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                      <p className="text-sm text-center text-gray-600">
                        Showing top {Math.min(filtereddata.length, 10)} results
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* No results message */}
            {query.trim() !== "" && filtereddata.length === 0 && !isLoading && (
              <div className="absolute left-0 right-0 top-full mt-2 z-50">
                <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-6 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    No articles found for "
                    <span className="font-medium">{query}</span>"
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Try adjusting your search terms
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
