import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Save, Share } from "lucide-react";
import toast from "react-hot-toast";
const Blog = () => {
  const { id } = useParams();
  const blogid = id;

  const [blog, setblog] = useState([]);
  const [isloggedin, setisloggedin] = useState(false);
  const [userID, setuserID] = useState("");

  const checkAuth = async () => {
    const response = await fetch(
      "https://bable-backend.vercel.app/user/authcheck",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    if (data) setuserID(data.userId);
    return data.Authenticated;
  };

  useEffect(() => {
    const currentstatus = async () => {
      const authStatus = await checkAuth();
      setisloggedin(authStatus);
    };

    currentstatus();
  }, []);

  const copyCurrentUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("URL copied to clipboard!", { duration: 1000 });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const fetching = async () => {
    if (blogid) {
      try {
        const response = await fetch(
          `https://bable-backend.vercel.app/blog/${blogid}`
        );
        const data = await response.json();
        if (data) {
          setblog(data);
          setuserID(data.author._id);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    } else {
      console.error("No id");
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
  useEffect(() => {
    if (blogid) {
      fetching();
    }
  }, [blogid]);

  return (
    <div className="min-h-screen m-0 py-8 px-2 sm:px-5 md:px-10 flex justify-center font-poppins mb-20">
      {blog && Object.keys(blog).length > 0 ? (
        <div className="flex flex-col gap-6 w-full max-w-3xl" key={blog._id}>
          <h1 className="text-zinc-800 text-2xl sm:text-3xl md:text-4xl font-poppins font-bold mt-6">
            {blog.heading}
          </h1>
          <Link
            to={`/profile/${userID}`}
            className="text-zinc-800 text-base sm:text-lg md:text-xl font-poppins font-semibold hover:underline"
          >
            {blog.author.name}
          </Link>
          <div className="space-y-8 mb-12">
            {blog.img_url && (
              <img
                src={blog.img_url}
                className="w-full h-48 sm:h-64 md:h-auto object-cover rounded-lg shadow-md"
                alt="Blog cover"
              />
            )}
            <div
              className="prose max-w-none text-base sm:text-lg text-zinc-700 leading-relaxed font-poppins mb-10"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            {isloggedin ? (
              <div className="flex space-x-6 sm:space-x-8">
                <div className="relative group">
                  <button
                    className="p-2 pl-0 rounded-md transition-all hover:cursor-pointer"
                    onClick={() => saveblog(blog._id)}
                  >
                    <Save className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-600 hover:text-black " />
                  </button>

                  <div className="absolute left-[12px] -top-12 -translate-x-1/2 mt-2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-black text-white text-xs px-2 py-2 rounded shadow whitespace-nowrap">
                      Save
                    </div>

                    <div className="w-2 h-2 bg-black rotate-45 -mt-1"></div>
                  </div>
                </div>

                <div className="relative group w-6">
                  <button
                    className="p-2 pl-0 rounded-md transition-all hover:cursor-pointer"
                    onClick={copyCurrentUrl}
                  >
                    <Share className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-600 hover:text-black" />
                  </button>

                  <div className="absolute left-[12px] -top-12 -translate-x-1/2 mt-2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-black text-white text-xs px-2 py-2 rounded shadow whitespace-nowrap">
                      Share
                    </div>

                    <div className="w-2 h-2 bg-black rotate-45 -mt-1"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative group w-6">
                <button
                  className="p-2 pl-0 rounded-md transition-all hover:cursor-pointer"
                  onClick={copyCurrentUrl}
                >
                  <Share className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-600 hover:text-black" />
                </button>

                <div className="absolute left-[12px] -top-12 -translate-x-1/2 mt-2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-black text-white text-xs px-2 py-2 rounded shadow whitespace-nowrap">
                    Share
                  </div>

                  <div className="w-2 h-2 bg-black rotate-45 -mt-1"></div>
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
          <div className="h-10 bg-gray-200 rounded w-3/4 mt-6"></div>

          <div className="h-6 bg-gray-200 rounded w-1/4"></div>

          <div className="w-full h-48 sm:h-64 bg-gray-200 rounded-lg shadow-md"></div>

          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-11/12"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>

          <div className="h-10 bg-gray-200 rounded w-28 mt-8"></div>
        </div>
      )}
    </div>
  );
};

export default Blog;
