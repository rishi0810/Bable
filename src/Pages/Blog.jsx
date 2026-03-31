import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Save, Share, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth.js";
import OptimizedImage from "../components/OptimizedImage.jsx";
import { buildApiUrl } from "../lib/api.js";

const Blog = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [blog, setBlog] = useState(null);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  useEffect(() => {
    if (!id) {
      console.error("No id");
      return undefined;
    }

    const controller = new AbortController();
    setBlog(null);

    const fetchBlog = async () => {
      try {
        const response = await fetch(buildApiUrl(`/blog/${id}`), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch blog: ${response.status}`);
        }

        const data = await response.json();

        if (data) {
          setBlog(data);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();

    return () => {
      controller.abort();
    };
  }, [id]);

  useEffect(() => {
    if (!isImageExpanded) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsImageExpanded(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isImageExpanded]);

  useEffect(() => {
    setIsImageExpanded(false);
  }, [id]);

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
        buildApiUrl(`/blog/save/${blogid}`),
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      toast.success(`${data.message}`, { duration: 1000 });
    } catch (error) {
      console.error("Error occured : " + error);
    }
  };

  const authorId = blog?.author?._id || "";

  return (
    <div className="min-h-screen m-0 py-8 px-2 sm:px-5 md:px-10 flex justify-center font-poppins mb-20">
      {blog && Object.keys(blog).length > 0 ? (
        <>
          <div className="flex flex-col gap-2 w-full max-w-3xl" key={blog._id}>
            <h1 className="text-ed-text text-2xl sm:text-3xl md:text-4xl font-merriweather font-bold mt-6 leading-relaxed tracking-wide">
              {blog.heading}
            </h1>
            <a
              href={`/profile/${authorId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ed-text text-base sm:text-lg md:text-xl font-poppins font-semibold hover:underline"
            >
              {blog.author.name}
            </a>

            <div className="space-y-14 mb-12">
              {blog.img_url && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsImageExpanded(true)}
                    className="w-full sm:w-4/5 rounded-xl overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-ed-accent"
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
              <div
                className="prose max-w-none text-base sm:text-lg text-ed-text-secondary font-merriweather mb-10 leading-loose tracking-wide"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              {isAuthenticated ? (
                <div className="flex space-x-6 sm:space-x-8">
                  <div className="relative group">
                    <button
                      className="p-2 pl-0 rounded-md transition-all hover:cursor-pointer"
                      onClick={() => saveblog(blog._id)}
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
              ) : (
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
              )}
            </div>
          </div>
          {isImageExpanded && blog.img_url && (
            <div
              className="fixed inset-0 z-[100] bg-black/85 px-4 py-6 sm:p-8 flex items-center justify-center"
              onClick={() => setIsImageExpanded(false)}
            >
              <div
                className="relative w-full max-w-6xl max-h-full flex items-center justify-center"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setIsImageExpanded(false)}
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
      ) : (
        <div
          className="flex flex-col gap-6 w-full max-w-3xl animate-pulse"
          key="skeleton"
        >
          <div className="h-10 bg-ed-surface-hover rounded w-3/4 mt-6"></div>
          <div className="h-6 bg-ed-surface-hover rounded w-1/4"></div>
          <div className="w-full h-48 sm:h-64 bg-ed-surface-hover rounded-lg shadow-md"></div>
          <div className="space-y-3">
            <div className="h-4 bg-ed-surface-hover rounded w-full"></div>
            <div className="h-4 bg-ed-surface-hover rounded w-11/12"></div>
            <div className="h-4 bg-ed-surface-hover rounded w-4/5"></div>
            <div className="h-4 bg-ed-surface-hover rounded w-3/4"></div>
            <div className="h-4 bg-ed-surface-hover rounded w-2/3"></div>
          </div>
          <div className="h-10 bg-ed-surface-hover rounded w-28 mt-8"></div>
        </div>
      )}
    </div>
  );
};

export default Blog;
