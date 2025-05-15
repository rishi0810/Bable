import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

export default function Create() {
  const navigate = useNavigate();
  const [isloggedin, setisloggedin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [formData, setFormData] = useState({
    heading: "",
    content: "",
    imageUrl: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Write your blog content here...",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch(
        "https://bable-backend.vercel.app/user/authcheck",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setisloggedin(data.Authenticated);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isChecking && !isloggedin) {
      navigate("/login");
    }
  }, [isChecking, isloggedin, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "imageUrl") {
      setImagePreview(e.target.value);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://bable-backend.vercel.app/blog/create",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            heading: formData.heading,
            content: formData.content,
            img_url: formData.imageUrl,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Blog Submitted Successfully:", data);
        navigate("/blogs");
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 font-poppins">
      <div className="p-6 w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-zinc-950">
          Create a Blog Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="heading"
              className="block text-sm font-medium mb-1 text-zinc-700"
            >
              Blog Title
            </label>
            <input
              id="heading"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              placeholder="Enter a captivating title"
              className="w-full p-3 border rounded-lg text-lg font-semibold focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-700">
              Blog Content
            </label>
            <div className="border rounded-lg p-1 bg-white min-h-[300px]">
              {editor && (
                <div className="tiptap-toolbar border-b mb-2 p-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-1 rounded ${
                      editor.isActive("bold")
                        ? "bg-zinc-200"
                        : "hover:bg-zinc-100"
                    }`}
                    title="Bold"
                  >
                    <span className="font-bold">B</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-1 rounded ${
                      editor.isActive("italic")
                        ? "bg-zinc-200"
                        : "hover:bg-zinc-100"
                    }`}
                    title="Italic"
                  >
                    <span className="italic">I</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    className={`p-1 rounded ${
                      editor.isActive("heading", { level: 1 })
                        ? "bg-zinc-200"
                        : "hover:bg-zinc-100"
                    }`}
                    title="Heading 1"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={`p-1 rounded ${
                      editor.isActive("heading", { level: 2 })
                        ? "bg-zinc-200"
                        : "hover:bg-zinc-100"
                    }`}
                    title="Heading 2"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
                    className={`p-1 rounded ${
                      editor.isActive("bulletList")
                        ? "bg-zinc-200"
                        : "hover:bg-zinc-100"
                    }`}
                    title="Bullet List"
                  >
                    • List
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleOrderedList().run()
                    }
                    className={`p-1 rounded ${
                      editor.isActive("orderedList")
                        ? "bg-zinc-200"
                        : "hover:bg-zinc-100"
                    }`}
                    title="Numbered List"
                  >
                    1. List
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().toggleBlockquote().run()
                    }
                    className={`p-1 rounded ${
                      editor.isActive("blockquote")
                        ? "bg-zinc-200"
                        : "hover:bg-zinc-100"
                    }`}
                    title="Quote"
                  >
                    Quote
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().setTextAlign("left").run()
                    }
                    className={`p-1 rounded ${
                      editor.isActive({ textAlign: "left" })
                        ? "bg-zinc-200"
                        : "hover:bg-zinc-100"
                    }`}
                    title="Align Left"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().setTextAlign("center").run()
                    }
                    className={`p-1 rounded ${
                      editor.isActive({ textAlign: "center" })
                        ? "bg-zinc-200"
                        : "hover:bg-zinc-100"
                    }`}
                    title="Align Center"
                  >
                    ↔
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      editor.chain().focus().setTextAlign("right").run()
                    }
                    className={`p-1 rounded ${
                      editor.isActive({ textAlign: "right" })
                        ? "bg-zinc-200"
                        : "hover:bg-zinc-100"
                    }`}
                    title="Align Right"
                  >
                    →
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = window.prompt("Enter the URL");
                      if (url) {
                        editor.chain().focus().setLink({ href: url }).run();
                      }
                    }}
                    className={`p-1 rounded ${
                      editor.isActive("link")
                        ? "bg-zinc-200"
                        : "hover:bg-zinc-100"
                    }`}
                    title="Link"
                  >
                    Link
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = window.prompt("Enter the image URL");
                      if (url) {
                        editor.chain().focus().setImage({ src: url }).run();
                      }
                    }}
                    className="p-1 rounded hover:bg-zinc-100"
                    title="Image"
                  >
                    Image
                  </button>
                </div>
              )}
              <EditorContent
                editor={editor}
                className="prose max-w-none p-3 min-h-[250px]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium mb-1 text-zinc-700"
            >
              Cover Image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL for your blog cover"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
            />
          </div>

          {imagePreview && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1 text-zinc-700">
                Image Preview
              </label>
              <img
                src={imagePreview}
                alt="Blog Cover"
                className="w-full h-auto rounded-lg border"
                onError={handleImageError}
                onLoad={handleImageLoad}
                style={{ display: imageError ? "none" : "block" }}
              />
              {imageError && (
                <div className="bg-gray-100 text-gray-500 border rounded-lg w-full h-40 flex items-center justify-center">
                  <p>Invalid image URL or image failed to load</p>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className={`w-full bg-zinc-900 text-white p-3 rounded-lg cursor-pointer hover:bg-zinc-700 font-medium text-lg transition duration-200 ${
              isSubmitting ? "opacity-70" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
