import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    storedBlogs: [],
    writtenBlogs: [],
  });
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user/details", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [user]);

  const handledeletefromwritten = async (blogid) => {
    try {
      const response = await fetch(`/api/blog/delete/${blogid}`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new error("Failed to delete");

      setUser((prev) => ({
        ...prev,
        writtenBlogs: prev.writtenBlogs.filter((blog) => blog._id !== blogid),
      }));
      alert("Blog Deleted!");
    } catch (err) {
      console.error("An error occured");
    }
  };
  const handledeletefromsaved = async (blogid) => {
    try {
      const response = await fetch(`/api/blog/remove/${blogid}`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) throw new error("Failed to delete");

      setUser((prev) => ({
        ...prev,
        storedBlogs: prev.storedBlogs.filter((blog) => blog._id !== blogid),
      }));
      alert("Blog Deleted!");
    } catch (err) {
      console.error("An error occured");
    }
  };



  return (
    <div className="w-11/12 mx-auto p-6 bg-white min-h-screen font-poppins">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {user.name || "User"}
        </h1>
        <p className="text-gray-600">{user.email || "No email available"}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Saved Blogs
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          {user.storedBlogs.length > 0 ? (
            user.storedBlogs.map((blog) => (
              <li key={blog._id} className="flex w-full justify-between items-center">
                <Link
                  to={"/blog"}
                  state={{ blogid: blog._id }}
                  className="text-sky-600 hover:underline"
                >
                  {blog.heading}
                </Link>
                <button
                  onClick={() => handledeletefromsaved(blog._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                >
                  Remove
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No saved blogs</p>
          )}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Written Blogs
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          {user.writtenBlogs.length > 0 ? (
            user.writtenBlogs.map((blog) => (
              <li
                key={blog._id}
                className="flex w-full justify-between items-center"
              >
                <Link
                  to={"/blog"}
                  state={{ blogid: blog._id }}
                  className="text-sky-600 hover:underline"
                >
                  {blog.heading}
                </Link>
                <button
                  onClick={() => handledeletefromwritten(blog._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No written blogs</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
