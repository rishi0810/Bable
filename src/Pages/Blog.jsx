import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ArrowUp, ArrowDown } from "lucide-react";

const Blog = () => {
  const location = useLocation();
  const blogid = location.state?.blogid;
  const [blog, setblog] = useState({});

  const fetching = async () => {
    if (blogid) {
      try {
        const response = await fetch(`/api/todos/${blogid}`);
        const data = await response.json();
        if (data) setblog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    } else {
      console.error("No id");
    }
  };

  useEffect(() => {
    fetching();
  }, [blogid]);

  return (
    <div className="min-h-screen m-0 p-10 flex gap-20 justify-center">
      {blog && Object.keys(blog).length > 0 ? (
        <div className="flex flex-col gap-8 w-3/4" key={blog._id}>
          <h1 className="text-zinc-800 text-4xl font-poppins font-bold">
            {blog.heading}
          </h1>
          <h5 className="text-zinc-800 text-xl font-poppins font-semibold">
            {blog.author}
          </h5>
          <div className="space-y-5">
            <img
              src={blog.img_url}
              className="w-full h-3/5 rounded-lg shadow"
              alt=""
            />
            <p className="text-md text-justify font-poppins text-zinc-700">
              {blog.content}
            </p>
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
