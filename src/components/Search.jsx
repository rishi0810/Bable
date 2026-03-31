import {
  memo,
  startTransition,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router";
import { Search as SearchIcon, FileText, ChevronRight } from "lucide-react";

const ShimmerItem = memo(() => (
  <li className="border-b border-ed-border last:border-b-0">
    <div className="block px-4 py-3">
      <div className="flex items-start space-x-3 animate-pulse">
        <div className="flex-shrink-0 mt-1">
          <div className="h-4 w-4 bg-ed-surface-hover rounded" />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 bg-ed-surface-hover rounded w-3/4" />
          <div className="h-3 bg-ed-surface-hover rounded w-1/2" />
        </div>
      </div>
    </div>
  </li>
));

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const Search = ({ results }) => {
  const [query, setQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const deferredQuery = useDeferredValue(query);
  const trimmedQuery = deferredQuery.trim();
  const normalizedQuery = trimmedQuery.toLowerCase();
  const isLoading = query.trim() !== "" && query !== deferredQuery;

  const filteredData = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return (results || [])
      .filter((result) =>
        result.heading.toLowerCase().includes(normalizedQuery)
      )
      .slice(0, 10);
  }, [normalizedQuery, results]);

  const queryPattern = useMemo(() => {
    if (!trimmedQuery) {
      return null;
    }

    return new RegExp(`(${escapeRegExp(trimmedQuery)})`, "gi");
  }, [trimmedQuery]);

  const handleevent = (e) => {
    const nextQuery = e.target.value;
    startTransition(() => {
      setQuery(nextQuery);
    });
  };

  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
    };

    document.addEventListener("keydown", handleShortcut);

    return () => {
      document.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  const shortcutLabel =
    typeof navigator !== "undefined" && navigator.platform.includes("Mac")
      ? "⌘"
      : "Ctrl";

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-6 pb-4">
      <div className="relative">
        {/* Search input */}
        <div
          className={`flex items-center bg-ed-surface border rounded-lg transition-all duration-300 ${
            isSearchFocused ? "border-ed-accent" : "border-ed-input-border"
          }`}
        >
          <div className="w-full relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-ed-text-tertiary pointer-events-none" strokeWidth={1.75} />
            <input
              id="search-input"
              type="text"
              className="py-3 pl-11 pr-20 block w-full bg-transparent text-ed-text font-body text-sm focus:outline-none placeholder:text-ed-text-tertiary"
              placeholder="Search stories..."
              value={query}
              onChange={handleevent}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() =>
                setTimeout(() => setIsSearchFocused(false), 200)
              }
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="hidden sm:flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-ed-text-tertiary bg-ed-surface-hover border border-ed-border rounded font-sans-ui">
                  {shortcutLabel}
                </kbd>
                <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-ed-text-tertiary bg-ed-surface-hover border border-ed-border rounded font-sans-ui">
                  K
                </kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Results dropdown */}
        {(isLoading || filteredData.length > 0) && (
          <div className="absolute left-0 right-0 top-full mt-1.5 z-50">
            <div className="bg-ed-surface border border-ed-border rounded-lg max-h-72 overflow-hidden shadow-lg">
              <div className="px-4 py-2 border-b border-ed-border">
                <p className="text-[10px] tracking-[0.12em] uppercase text-ed-text-tertiary font-sans-ui font-medium">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border-[1.5px] border-ed-text-tertiary border-t-ed-accent rounded-full animate-spin" />
                      <span>Searching...</span>
                    </span>
                  ) : (
                    `${filteredData.length} result${
                      filteredData.length !== 1 ? "s" : ""
                    } found`
                  )}
                </p>
              </div>

              <ul className="max-h-56 overflow-y-auto">
                {isLoading ? (
                  <>
                    <ShimmerItem />
                    <ShimmerItem />
                    <ShimmerItem />
                  </>
                ) : (
                  filteredData.map((result) => (
                    <li
                      key={result._id}
                      className="border-b border-ed-border last:border-b-0"
                    >
                      <Link
                        to={`/blog/${result._id}`}
                        className="block px-4 py-3 hover:bg-ed-surface-hover transition-colors duration-150 group"
                      >
                        <div className="flex items-start gap-3">
                          <FileText
                            className="size-4 text-ed-text-tertiary group-hover:text-ed-accent flex-shrink-0 mt-0.5"
                            strokeWidth={1.5}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-body text-ed-text group-hover:text-ed-accent line-clamp-2 transition-colors">
                              {(queryPattern
                                ? result.heading.split(queryPattern)
                                : [result.heading]
                              ).map((part, i) =>
                                part.toLowerCase() ===
                                trimmedQuery.toLowerCase() ? (
                                    <mark
                                      key={i}
                                      className="bg-ed-accent/20 text-ed-accent px-0.5 rounded-sm"
                                    >
                                      {part}
                                    </mark>
                                  ) : (
                                    part
                                  )
                                )}
                            </p>
                          </div>
                          <ChevronRight
                            className="size-4 text-ed-text-tertiary group-hover:text-ed-accent flex-shrink-0 transition-colors"
                            strokeWidth={1.5}
                          />
                        </div>
                      </Link>
                    </li>
                  ))
                )}
              </ul>

              {!isLoading && filteredData.length > 5 && (
                <div className="px-4 py-2 border-t border-ed-border">
                  <p className="text-[10px] tracking-[0.1em] uppercase text-center text-ed-text-tertiary font-sans-ui">
                    Showing top {Math.min(filteredData.length, 10)} results
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* No results */}
        {query.trim() !== "" && filteredData.length === 0 && !isLoading && (
          <div className="absolute left-0 right-0 top-full mt-1.5 z-50">
            <div className="bg-ed-surface border border-ed-border rounded-lg p-6 text-center">
              <FileText
                className="mx-auto size-8 text-ed-text-tertiary mb-2"
                strokeWidth={1}
              />
              <p className="text-sm text-ed-text-secondary font-body">
                No stories found for &ldquo;
                <span className="font-medium text-ed-text">{query}</span>
                &rdquo;
              </p>
              <p className="text-[10px] text-ed-text-tertiary font-sans-ui mt-1 tracking-wide uppercase">
                Try different search terms
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
