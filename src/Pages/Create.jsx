import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useAuth } from "../hooks/useAuth.js";

export default function Create() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [formData, setFormData] = useState({
    heading: "",
    content: "",
    imageUrl: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Start writing your story…",
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  const checkAuth = useCallback(async () => {
    try {
      setIsChecking(false);
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isChecking && !isAuthenticated) {
      navigate("/login");
    }
  }, [isChecking, isAuthenticated, navigate]);

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
    <div className="flex flex-col md:flex-row min-h-screen font-poppins bg-white">
      <div className="flex-1 p-6 md:p-12 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          <input
            id="heading"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            placeholder="Title"
            className="w-full text-4xl font-bold bg-transparent border-0 border-b border-zinc-200 focus:ring-0 focus:border-zinc-400 placeholder:text-zinc-400 mb-6 outline-none"
            required
            autoComplete="off"
            style={{ boxShadow: "none" }}
          />
          <input
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Cover image URL"
            className="w-full text-base bg-transparent border-0 border-b border-zinc-200 focus:ring-0 focus:border-zinc-400 placeholder:text-zinc-400 mb-6 outline-none"
            autoComplete="off"
            style={{ boxShadow: "none" }}
          />

          {editor && (
            <div className="flex flex-wrap gap-2 mb-2 border-b pb-2">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1 rounded ${
                  editor.isActive("bold") ? "bg-zinc-200" : "hover:bg-zinc-100"
                }`}
                title="Bold"
              >
                <b>B</b>
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
                <i>I</i>
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
                ⇤
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
                ⇥
              </button>
              <button
                type="button"
                onClick={() => {
                  const url = window.prompt("Enter the URL");
                  if (url) editor.chain().focus().setLink({ href: url }).run();
                }}
                className={`p-1 rounded ${
                  editor.isActive("link")
                    ? "text-blue-800"
                    : "hover:text-blue-600 hover:underline"
                }`}
                title="Link"
              >
                🔗
              </button>
              <button
                type="button"
                onClick={() => {
                  const url = window.prompt("Enter the image URL");
                  if (url) editor.chain().focus().setImage({ src: url }).run();
                }}
                className="p-1 rounded hover:bg-zinc-100"
                title="Image"
              >
                🖼️
              </button>
            </div>
          )}
          <div className="bg-zinc-50 rounded-2xl shadow-md p-6 min-h-[380px]">
            <EditorContent
              editor={editor}
              className="tiptap max-w-none min-h-[500px] focus:outline-none text-lg"
            />
          </div>
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
      <div className="hidden md:block w-1/2 bg-gray-50 border-l border-zinc-100 p-8 overflow-y-auto">
        <div className="max-w-xl mx-auto">
          {formData.imageUrl && !imageError && (
            <img
              src={formData.imageUrl}
              alt="Blog Cover Preview"
              className="w-full h-64 object-cover rounded-xl mb-6 border"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          )}
          <h1 className="text-4xl font-bold text-zinc-750 mb-4 break-words">
            {formData.heading || <span className="text-zinc-300">Title</span>}
          </h1>
          <div
            className="prose prose-zinc max-w-none"
            dangerouslySetInnerHTML={{
              __html:
                formData.content ||
                '<p class="text-zinc-750">Start writing your story…</p>',
            }}
          />
        </div>
      </div>
    </div>
  );
}
