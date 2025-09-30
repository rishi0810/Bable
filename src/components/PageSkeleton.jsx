const PageSkeleton = ({ type = "default" }) => {
  const skeletonClasses = "bg-gray-200 animate-pulse rounded";

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
    <div className="min-h-screen bg-white">
      {renderSkeleton()}
    </div>
  );
};

export default PageSkeleton;