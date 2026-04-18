const LoadingSpinner = ({ size = "medium", message = "Loading..." }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8", 
    large: "w-12 h-12"
  };

  return (
    <div className="min-h-screen bg-ed-bg text-ed-text flex flex-col items-center justify-center p-8">
      <div
        className={`${sizeClasses[size]} border-3 border-ed-border border-t-ed-text-secondary rounded-full animate-spin`}
      ></div>
      <p className="mt-4 text-ed-text-secondary text-sm font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
