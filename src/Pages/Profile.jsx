import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const BlogListItem = ({ blog, onDelete, buttonText }) => (
  <li className="flex items-center gap-4 bg-gray-100 p-3 sm:p-4 rounded-lg shadow-sm animate-fade-in">
    <Link to={`/blog/${blog._id}`} className="flex-1 min-w-0">
      <p className="text-blue-600 hover:underline text-base truncate sm:text-clip">
        {blog.heading}
      </p>
    </Link>

    <button
      onClick={onDelete}
      className="flex-shrink-0 bg-red-500 text-white font-medium text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
    >
      {buttonText}
    </button>
  </li>
);

const Skeleton = () => (
  <div className="w-11/12 max-w-4xl mx-auto py-8 sm:py-12 font-poppins animate-pulse">
    <div className="text-center mb-10">
      <div className="h-8 w-48 bg-gray-300 rounded mx-auto mb-2" />
      <div className="h-4 w-32 bg-gray-200 rounded mx-auto" />
      <div className="h-3 w-28 bg-gray-200 rounded mx-auto mt-2" />
    </div>

    <div className="space-y-10">
      {[1, 2].map((section) => (
        <div key={section}>
          <div className="h-6 w-40 bg-gray-300 rounded mb-4" />
          <ul className="space-y-3">
            {[1, 2, 3].map((i) => (
              <li key={i} className="bg-gray-200 h-12 rounded-lg" />
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const ErrorScreen = () => (
  <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
    <div className="bg-red-100 text-red-700 border border-red-300 px-6 py-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Failed to load profile</h2>
      <p className="text-sm">Something went wrong while fetching user data.</p>
    </div>
  </div>
);

const Profile = () => {
  const { userID } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://bable-backend.vercel.app/user/details/${userID}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data);
        setError(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userID]);

  const handledeletefromwritten = async (blogid) => {
    try {
      const response = await fetch(
        `https://bable-backend.vercel.app/blog/delete/${blogid}`,
        { method: "POST", credentials: "include" }
      );

      if (!response.ok) throw new Error("Failed to delete");

      setUser((prev) => ({
        ...prev,
        writtenBlogs: prev.writtenBlogs.filter((blog) => blog._id !== blogid),
      }));
      alert("Blog Deleted!");
    } catch (err) {
      console.error("An error occurred while deleting from written." + err);
    }
  };

  const handledeletefromsaved = async (blogid) => {
    try {
      const response = await fetch(
        `https://bable-backend.vercel.app/blog/remove/${blogid}`,
        { method: "POST", credentials: "include" }
      );

      if (!response.ok) throw new Error("Failed to delete");

      setUser((prev) => ({
        ...prev,
        storedBlogs: prev.storedBlogs.filter((blog) => blog._id !== blogid),
      }));
      alert("Blog Removed!");
    } catch (err) {
      console.error("An error occurred while deleting from saved." + err);
    }
  };

  if (loading) return <Skeleton />;
  if (error || !user) return <ErrorScreen />;

  return (
    <div className="w-11/12 max-w-4xl mx-auto py-8 sm:py-12 font-poppins">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          {user.name}
        </h1>
        <p className="text-gray-600 mt-1">{user.email}</p>
        {user.createdAt && (
          <p className="text-gray-500 text-sm mt-2">{`Joined on ${formatDate(
            user.createdAt
          )}`}</p>
        )}
      </div>

      <div className="space-y-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Saved Blogs</h2>
          {user.storedBlogs && user.storedBlogs.length > 0 ? (
            <ul className="space-y-3">
              {user.storedBlogs.map((blog) => (
                <BlogListItem
                  key={blog._id}
                  blog={blog}
                  onDelete={() => handledeletefromsaved(blog._id)}
                  buttonText="Remove"
                />
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 bg-gray-100 p-4 rounded-lg text-center">
              No saved blogs found.
            </p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Written Blogs
          </h2>
          {user.writtenBlogs && user.writtenBlogs.length > 0 ? (
            <ul className="space-y-3">
              {user.writtenBlogs.map((blog) => (
                <BlogListItem
                  key={blog._id}
                  blog={blog}
                  onDelete={() => handledeletefromwritten(blog._id)}
                  buttonText="Delete"
                />
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 bg-gray-100 p-4 rounded-lg text-center">
              You haven't written any blogs yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
