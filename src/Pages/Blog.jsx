import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Save, Share } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth.js";

const Blog = () => {
  const { id } = useParams();
  const blogid = id;
  const { isAuthenticated } = useAuth();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBlog = async () => {
      if (!blogid) {
        console.error("No id");
        return;
      }

      try {
        const response = await fetch(
          `https://bable-backend.vercel.app/blog/${blogid}`
        );
        const data = await response.json();

        if (isMounted && data) {
          setBlog(data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();

    return () => {
      isMounted = false;
    };
  }, [blogid]);

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
        `https://bable-backend.vercel.app/blog/save/${blogid}`,
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
        <div className="flex flex-col gap-6 w-full max-w-3xl" key={blog._id}>
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

          <div className="space-y-8 mb-12">
            {blog.img_url && (
              <div className="flex justify-center">
                <div className="w-4/5 aspect-video">
                  <img
                    src={blog.img_url}
                    className="w-full h-full object-cover rounded-xl shadow-md"
                    alt="Blog cover"
                  />
                </div>
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
