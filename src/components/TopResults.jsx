import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import OptimizedImage from "./OptimizedImage.jsx";

const PAGE_SIZE = 8;

const TopResults = ({ results }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const node = loadMoreRef.current;

    if (!node || visibleCount >= results.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting) {
          setVisibleCount((current) =>
            Math.min(current + PAGE_SIZE, results.length)
          );
        }
      },
      {
        rootMargin: "160px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [results.length, visibleCount]);

  const visibleResults = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  return (
    <>
      {visibleResults.length > 0 ? (
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          {visibleResults.map((item, index) => (
            <Link to={`/blog/${item.id || item._id}`} key={item.id || item._id}>
              <article className="group py-6 sm:py-8 border-b border-ed-border last:border-b-0">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                  {/* Image */}
                  <div className="w-full sm:w-36 md:w-44 flex-shrink-0">
                    <div className="relative overflow-hidden rounded-lg">
                      <OptimizedImage
                        className="w-full aspect-video object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                        src={item.img_url}
                        alt={item.heading}
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        sizes="(min-width: 1024px) 176px, (min-width: 640px) 144px, calc(100vw - 40px)"
                        widths={[288, 352, 440]}
                        transformOptions={{
                          aspectRatio: 16 / 9,
                          crop: "fill",
                          gravity: "auto",
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2 min-w-0">
                    <h2 className="font-display text-lg sm:text-xl text-ed-text leading-snug tracking-tight line-clamp-2 group-hover:text-ed-accent transition-colors duration-200">
                      {item.heading}
                    </h2>
                    {item.author?.name && (
                      <p className="text-[11px] tracking-[0.15em] uppercase text-ed-text-tertiary font-sans-ui">
                        by {item.author.name}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
          {hasMore && (
            <div
              ref={loadMoreRef}
              className="py-6 text-center text-xs tracking-[0.18em] uppercase text-ed-text-tertiary font-sans-ui"
            >
              Scroll to load more
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="py-6 sm:py-8 border-b border-ed-border animate-pulse"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                <div className="w-full sm:w-36 md:w-44 flex-shrink-0">
                  <div className="w-full aspect-video bg-ed-surface-hover rounded-lg" />
                </div>
                <div className="flex-1 space-y-3 w-full">
                  <div className="h-5 bg-ed-surface-hover rounded w-4/5" />
                  <div className="h-3 bg-ed-surface-hover rounded w-1/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TopResults;
