import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Save } from "lucide-react";
const Blog = () => {
  const location = useLocation();
  const blogid = location.state?.blogid;
  const [blog, setblog] = useState([]);
  const [isloggedin, setisloggedin] = useState(false);

  const checkAuth = async () => {
    const response = await fetch(
      "https://bable-backend.vercel.app/user/authcheck",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    return data.Authenticated;
  };

  useEffect(() => {
    const currentstatus = async () => {
      const authStatus = await checkAuth();
      setisloggedin(authStatus);
    };

    currentstatus();
  }, []);

  const fetching = async () => {
    if (blogid) {
      try {
        const response = await fetch(
          `https://bable-backend.vercel.app/blog/${blogid}`
        );
        const data = await response.json();
        if (data) setblog(data);
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
      alert(data.message);
    } catch (error) {
      console.error("Error occured : " + error);
    }
  };
  useEffect(() => {
    fetching();
  }, [blogid]);

  return (
    <div className="min-h-screen m-0 py-15 px-10 flex gap-20 justify-center font-poppins">
      {blog && Object.keys(blog).length > 0 ? (
        <div className="flex flex-col gap-8 w-1/2" key={blog._id}>
          <h1 className="text-zinc-800 text-4xl font-poppins font-bold">
            {blog.heading}
          </h1>
          <h5 className="text-zinc-800 text-xl font-poppins font-semibold">
            {blog.author.name}
          </h5>
          <div className="space-y-5">
            <img
              src={blog.img_url}
              className="w-full h-3/5 rounded-lg shadow"
              alt=""
            />
            <p className="text-lg text-justify font-poppins text-zinc-700">
              {blog.content}
            </p>
            {isloggedin && (
              <button
                onClick={() => saveblog(blog._id)}
                className="bg-zinc-200 hover:bg-zinc-300 cursor-pointer rounded-md shadow-md p-3 flex gap-1"
              >
                <Save className="size-6" />
                Save
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center text-xl">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Blog;
