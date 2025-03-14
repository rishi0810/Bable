import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
export default function Create() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    heading: "",
    author: "",
    content: "",
    imageUrl: "",
  });

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/todos/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          heading: formData.heading,
          author: formData.author,
          content: formData.content,
          img_url: formData.imageUrl,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Blog Submitted Successfully:", data);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 font-poppins">
      <div className="p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-zinc-950">
          Create a Blog Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            placeholder="Blog Heading"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author Name"
            className="w-full p-2 border rounded-lg"
            required
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Blog Content"
            className="w-full p-2 border rounded-lg min-h-[150px]"
            required
          />
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-zinc-900 text-white p-2 rounded-lg cursor-pointer hover:bg-zinc-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
