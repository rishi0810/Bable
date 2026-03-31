import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { buildApiUrl } from "../lib/api.js";

const BlogListItem = ({ blog, onDelete, buttonText }) => (
  <li className="flex items-center gap-4 py-4 border-b border-ed-border last:border-b-0">
    <Link to={`/blog/${blog._id}`} className="flex-1 min-w-0">
      <p className="font-body text-ed-text hover:text-ed-accent transition-colors duration-200 truncate sm:text-clip">
        {blog.heading}
      </p>
    </Link>
    <button
      onClick={onDelete}
      className="flex-shrink-0 text-[11px] tracking-[0.15em] uppercase font-sans-ui font-medium px-4 py-2 rounded-lg text-ed-accent border border-ed-accent hover:bg-ed-accent hover:text-white transition-colors duration-200 cursor-pointer"
    >
      {buttonText}
    </button>
  </li>
);

const Skeleton = () => (
  <div className="max-w-3xl mx-auto px-5 sm:px-6 py-10 sm:py-16 animate-pulse">
    <div className="text-center mb-12">
      <div className="h-8 w-48 bg-ed-surface-hover rounded mx-auto mb-3" />
      <div className="h-4 w-32 bg-ed-surface-hover rounded mx-auto" />
      <div className="h-3 w-28 bg-ed-surface-hover rounded mx-auto mt-2" />
    </div>
    <div className="space-y-12">
      {[1, 2].map((section) => (
        <div key={section}>
          <div className="h-6 w-40 bg-ed-surface-hover rounded mb-6" />
          <ul className="space-y-3">
            {[1, 2, 3].map((i) => (
              <li key={i} className="h-14 bg-ed-surface-hover rounded" />
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const ErrorScreen = () => (
  <div className="flex flex-col justify-center items-center text-center px-4 py-20">
    <div className="bg-ed-surface text-ed-text border border-ed-border px-8 py-6">
      <h2 className="font-display text-xl text-ed-text mb-2">
        Unable to Load Profile
      </h2>
      <p className="text-sm text-ed-text-secondary font-body">
        Something went wrong while fetching user data.
      </p>
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
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(buildApiUrl(`/user/details/${userID}`), {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data);
        setError(false);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("Error fetching user:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => {
      controller.abort();
    };
  }, [userID]);

  const handledeletefromwritten = async (blogid) => {
    try {
      const response = await fetch(
        buildApiUrl(`/blog/delete/${blogid}`),
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
        buildApiUrl(`/blog/remove/${blogid}`),
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
    <div className="max-w-3xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
      {/* User info */}
      <div className="text-center mb-14">
        <h1 className="font-display text-3xl sm:text-4xl text-ed-text tracking-tight">
          {user.name}
        </h1>
        <p className="text-ed-text-secondary font-body mt-2">{user.email}</p>
        {user.createdAt && (
          <p className="text-[12px] tracking-[0.15em] uppercase text-ed-text-tertiary font-sans-ui mt-2">
            Joined {formatDate(user.createdAt)}
          </p>
        )}
      </div>

      {/* Sections */}
      <div className="space-y-14">
        {/* Saved Stories */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-display text-xl sm:text-2xl text-ed-text whitespace-nowrap">
              Saved Stories
            </h2>
            <div className="flex-1 h-px bg-ed-border" />
          </div>
          {user.storedBlogs && user.storedBlogs.length > 0 ? (
            <ul>
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
            <p className="text-ed-text-tertiary font-body text-center py-10 border border-ed-border bg-ed-surface">
              No saved stories yet.
            </p>
          )}
        </section>

        {/* Written Stories */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-display text-xl sm:text-2xl text-ed-text whitespace-nowrap">
              Written Stories
            </h2>
            <div className="flex-1 h-px bg-ed-border" />
          </div>
          {user.writtenBlogs && user.writtenBlogs.length > 0 ? (
            <ul>
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
            <p className="text-ed-text-tertiary font-body text-center py-10 border border-ed-border bg-ed-surface">
              You haven&apos;t written any stories yet.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
