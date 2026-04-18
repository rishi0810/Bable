import { useEffect } from "react";
import { useParams } from "react-router";
import { Save, Share, X } from "lucide-react";
import toast from "react-hot-toast";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useShallow } from "zustand/react/shallow";
import { useAuth } from "../hooks/useAuth.js";
import OptimizedImage from "../components/OptimizedImage.jsx";
import { buildApiUrl, getAuthHeaders, readResponseBody } from "../lib/api.js";
import { useBlogStore } from "../stores/blogStore.js";
import "react-loading-skeleton/dist/skeleton.css";

const Blog = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const {
    blog,
    loading,
    error,
    isImageExpanded,
    setImageExpanded,
    resetForNextBlog,
    fetchBlog,
  } = useBlogStore(
    useShallow((state) => ({
      blog: state.blog,
      loading: state.loading,
      error: state.error,
      isImageExpanded: state.isImageExpanded,
      setImageExpanded: state.setImageExpanded,
      resetForNextBlog: state.resetForNextBlog,
      fetchBlog: state.fetchBlog,
    }))
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!id) {
      console.error("No id");
      return undefined;
    }

    const controller = new AbortController();
    resetForNextBlog();
    fetchBlog(id, controller.signal);

    return () => {
      controller.abort();
    };
  }, [id, fetchBlog, resetForNextBlog]);

  useEffect(() => {
    if (!isImageExpanded) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setImageExpanded(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isImageExpanded, setImageExpanded]);

  const copyCurrentUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("URL copied to clipboard!", { duration: 1000 });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const saveblog = async (blogid) => {
    try {
      const response = await fetch(
        buildApiUrl(`/blog/save-blog?id=${encodeURIComponent(blogid)}`),
        {
          method: "GET",
          headers: {
            ...getAuthHeaders(),
          },
        }
      );
      const data = await readResponseBody(response);

      if (!response.ok) {
        throw new Error(
          (typeof data === "string" && data) || "Failed to save blog"
        );
      }

      toast.success(
        (typeof data === "string" && data) || "Blog saved",
        { duration: 1200 }
      );
    } catch (error) {
      console.error("Error occured : " + error);
      toast.error(error.message || "Could not save blog");
    }
  };

  const authorId = blog?.author?.id || blog?.author?._id || "";
  const blogId = blog?.id || blog?._id;

  return (
    <SkeletonTheme baseColor="#ececec" highlightColor="#f6f6f6">
      <div className="min-h-screen m-0 py-8 px-2 sm:px-5 md:px-10 flex justify-center font-poppins mb-20">
        <>
          <div className="flex flex-col gap-2 w-full max-w-3xl" key={blogId}>
            <h1 className="text-ed-text text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mt-6 leading-relaxed tracking-wide">
              {blog?.heading || <Skeleton />}
            </h1>
            {blog ? (
              <a
                href={`/profile/${authorId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ed-text text-base sm:text-lg md:text-xl font-poppins font-semibold hover:underline"
              >
                {blog.author.name}
              </a>
            ) : (
              <div className="w-40">
                <Skeleton />
              </div>
            )}

            <div className="mt-8 sm:mt-10 space-y-14 mb-12">
              {blog?.img_url && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setImageExpanded(true)}
                    className="w-full sm:w-4/5 lg:w-3/4 rounded-xl overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-ed-accent"
                    aria-label="Expand blog cover image"
                  >
                    <OptimizedImage
                      src={blog.img_url}
                      className="w-full aspect-video object-cover rounded-xl shadow-md bg-ed-surface-hover"
                      alt="Blog cover"
                      loading="eager"
                      fetchPriority="high"
                      sizes="(min-width: 1024px) 720px, 80vw"
                      widths={[480, 720, 960, 1280]}
                      transformOptions={{
                        aspectRatio: 16 / 9,
                        crop: "fill",
                        gravity: "auto",
                      }}
                    />
                  </button>
                </div>
              )}
              {!blog && loading ? (
                <div className="flex justify-center">
                  <div className="w-full sm:w-4/5 lg:w-3/4">
                    <Skeleton className="w-full aspect-video rounded-xl" />
                  </div>
                </div>
              ) : null}
              {blog ? (
                <div
                  className="prose max-w-none text-base sm:text-lg text-ed-text-secondary font-merriweather mb-10 leading-loose tracking-wide"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              ) : (
                <div className="space-y-3">
                  <Skeleton count={7} />
                </div>
              )}
              {error ? (
                <p className="text-sm text-red-600">{error}</p>
              ) : null}
              {blog && isAuthenticated ? (
                <div className="flex space-x-6 sm:space-x-8">
                  <div className="relative group">
                    <button
                      className="p-2 pl-0 rounded-md transition-all hover:cursor-pointer"
                      onClick={() => saveblog(blogId)}
                    >
                      <Save className="w-5 h-5 sm:w-6 sm:h-6 text-ed-text-secondary hover:text-ed-text" />
                    </button>

                    <div className="absolute left-[12px] -top-12 -translate-x-1/2 mt-2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-ed-text text-ed-bg text-xs px-2 py-2 rounded shadow whitespace-nowrap">
                        Save
                      </div>
                      <div className="w-2 h-2 bg-ed-text rotate-45 -mt-1"></div>
                    </div>
                  </div>

                  <div className="relative group w-6">
                    <button
                      className="p-2 pl-0 rounded-md transition-all hover:cursor-pointer"
                      onClick={copyCurrentUrl}
                    >
                      <Share className="w-5 h-5 sm:w-6 sm:h-6 text-ed-text-secondary hover:text-ed-text" />
                    </button>

                    <div className="absolute left-[12px] -top-12 -translate-x-1/2 mt-2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-ed-text text-ed-bg text-xs px-2 py-2 rounded shadow whitespace-nowrap">
                        Share
                      </div>
                      <div className="w-2 h-2 bg-ed-text rotate-45 -mt-1"></div>
                    </div>
                  </div>
                </div>
              ) : null}
              {blog && !isAuthenticated ? (
                <div className="relative group w-6">
                  <button
                    className="p-2 pl-0 rounded-md transition-all hover:cursor-pointer"
                    onClick={copyCurrentUrl}
                  >
                    <Share className="w-5 h-5 sm:w-6 sm:h-6 text-ed-text-secondary hover:text-ed-text" />
                  </button>

                  <div className="absolute left-[12px] -top-12 -translate-x-1/2 mt-2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-ed-text text-ed-bg text-xs px-2 py-2 rounded shadow whitespace-nowrap">
                      Share
                    </div>
                    <div className="w-2 h-2 bg-ed-text rotate-45 -mt-1"></div>
                  </div>
                </div>
              ) : null}
              {loading && !error ? (
                <div className="w-24">
                  <Skeleton />
                </div>
              ) : null}
            </div>
          </div>
          {isImageExpanded && blog?.img_url && (
            <div
              className="fixed inset-0 z-[100] bg-black/85 px-4 py-6 sm:p-8 flex items-center justify-center"
              onClick={() => setImageExpanded(false)}
            >
              <div
                className="relative w-full max-w-6xl max-h-full flex items-center justify-center"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setImageExpanded(false)}
                  className="absolute top-0 right-0 -translate-y-12 sm:-translate-y-14 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close expanded image"
                >
                  <X className="w-5 h-5" />
                </button>
                <OptimizedImage
                  src={blog.img_url}
                  alt="Expanded blog cover"
                  className="max-w-full max-h-[88vh] object-contain rounded-xl shadow-2xl"
                  loading="eager"
                  fetchPriority="high"
                  sizes="100vw"
                  widths={[720, 960, 1280]}
                  transformOptions={{
                    aspectRatio: 16 / 9,
                    crop: "fill",
                    gravity: "auto",
                  }}
                />
              </div>
            </div>
          )}
        </>
      </div>
    </SkeletonTheme>
  );
};

export default Blog;
