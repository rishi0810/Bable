const PageSkeleton = ({ type = "default" }) => {
  const skeletonClasses = "bg-ed-surface-hover animate-pulse rounded";

  const renderSkeleton = () => {
    switch (type) {
      case "blog":
        return (
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className={`${skeletonClasses} h-8 w-3/4`}></div>
            <div className={`${skeletonClasses} h-4 w-1/2`}></div>
            <div className={`${skeletonClasses} h-64 w-full`}></div>
            <div className="space-y-3">
              <div className={`${skeletonClasses} h-4 w-full`}></div>
              <div className={`${skeletonClasses} h-4 w-5/6`}></div>
              <div className={`${skeletonClasses} h-4 w-4/5`}></div>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="max-w-2xl mx-auto p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className={`${skeletonClasses} w-20 h-20 rounded-full`}></div>
              <div className="space-y-2">
                <div className={`${skeletonClasses} h-6 w-32`}></div>
                <div className={`${skeletonClasses} h-4 w-24`}></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`${skeletonClasses} h-32 rounded-lg`}></div>
              ))}
            </div>
          </div>
        );
      case "form":
        return (
          <div className="max-w-md mx-auto p-6 space-y-4">
            <div className={`${skeletonClasses} h-8 w-48 mx-auto`}></div>
            <div className="space-y-4">
              <div className={`${skeletonClasses} h-12 w-full rounded-lg`}></div>
              <div className={`${skeletonClasses} h-12 w-full rounded-lg`}></div>
              <div className={`${skeletonClasses} h-12 w-full rounded-lg`}></div>
              <div className={`${skeletonClasses} h-12 w-full rounded-lg`}></div>
            </div>
          </div>
        );
      case "blogs":
        return (
          <div className="min-h-screen">
            <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-10 sm:pt-16 pb-6">
              <div className="text-center space-y-3 animate-pulse">
                <div className={`${skeletonClasses} h-3 w-20 mx-auto`} />
                <div className={`${skeletonClasses} h-10 sm:h-11 w-64 sm:w-80 mx-auto`} />
                <div className={`${skeletonClasses} h-4 w-72 sm:w-80 mx-auto`} />
              </div>
            </div>

            <div className="max-w-3xl mx-auto px-5 sm:px-6 pb-4">
              <div className="relative">
                <div className="flex items-center bg-ed-surface border border-ed-input-border rounded-lg animate-pulse">
                  <div className="w-full relative">
                    <div className={`${skeletonClasses} h-11 w-full rounded-lg`} />
                  </div>
                </div>
              </div>
            </div>

            <section className="pb-16">
              <div className="max-w-3xl mx-auto px-5 sm:px-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="py-6 sm:py-8 border-b border-ed-border last:border-b-0 animate-pulse"
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
            </section>
          </div>
        );
      default:
        return (
          <div className="max-w-4xl mx-auto p-6 space-y-4">
            <div className={`${skeletonClasses} h-8 w-1/2`}></div>
            <div className="space-y-3">
              <div className={`${skeletonClasses} h-4 w-full`}></div>
              <div className={`${skeletonClasses} h-4 w-5/6`}></div>
              <div className={`${skeletonClasses} h-4 w-4/5`}></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-ed-bg text-ed-text">
      {renderSkeleton()}
    </div>
  );
};

export default PageSkeleton;
