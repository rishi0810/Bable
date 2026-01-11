import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useAuth } from "../hooks/useAuth.js";
import {
  ArrowLeft,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  List,
  ListOrdered,
  X,
  Undo,
  Redo,
} from "lucide-react";

export default function Create() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [formData, setFormData] = useState({
    heading: "",
    content: "",
    imageUrl: "",
  });

  const [imageError, setImageError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        hardBreak: {
          keepMarks: true,
        },
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Start writing...",
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  // Check if form is valid for publishing (title, content, and image are required)
  const isFormValid = useMemo(() => {
    const hasTitle = formData.heading.trim().length > 0;
    const hasContent =
      formData.content.trim().length > 0 &&
      formData.content !== "<p></p>" &&
      formData.content !== "<p><br></p>";
    const hasImage = formData.imageUrl.trim().length > 0;
    return hasTitle && hasContent && hasImage;
  }, [formData.heading, formData.content, formData.imageUrl]);

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
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!isFormValid) return;

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

  // Prevent toolbar buttons from stealing focus
  const handleToolbarClick = (e, action) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  const ToolbarButton = ({ onClick, isActive, isDisabled, children, title }) => (
    <button
      type="button"
      onMouseDown={(e) => {
        if (isDisabled) {
          e.preventDefault();
          return;
        }
        handleToolbarClick(e, onClick);
      }}
      className={`p-2 rounded-md transition-colors ${isDisabled
        ? "text-zinc-300 cursor-not-allowed"
        : isActive
          ? "bg-zinc-200 text-zinc-900"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
        }`}
      title={title}
    >
      {children}
    </button>
  );

  const ToolbarDivider = () => (
    <div className="w-px h-6 bg-zinc-200 mx-1" />
  );

  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-zinc-100 px-4 py-3">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          {/* Left side - Back button */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-600" />
            </button>
          </div>

          {/* Right side - Preview and Publish */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="px-4 py-2 text-sm font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
            >
              Preview
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors ${isFormValid && !isSubmitting
                ? "bg-orange-500 hover:bg-orange-600 cursor-pointer"
                : "bg-zinc-300 cursor-not-allowed"
                }`}
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </header>

      {/* Sticky Toolbar */}
      {editor && (
        <div className="sticky top-[57px] z-40 bg-white border-b border-zinc-100 px-4 py-2">
          <div className="flex items-center justify-center gap-1 flex-wrap max-w-5xl mx-auto">
            {/* Undo/Redo */}
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              title="Undo"
            >
              <Undo className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              title="Redo"
            >
              <Redo className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Text Formatting */}
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive("strike")}
              title="Strikethrough"
            >
              <Strikethrough className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              isActive={editor.isActive("code")}
              title="Code"
            >
              <Code className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Insert Options */}
            <ToolbarButton
              onClick={() => {
                const url = window.prompt("Enter the URL");
                if (url) editor.chain().focus().setLink({ href: url }).run();
              }}
              isActive={editor.isActive("link")}
              title="Link"
            >
              <LinkIcon className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => {
                const url = window.prompt("Enter the image URL");
                if (url) editor.chain().focus().setImage({ src: url }).run();
              }}
              title="Image"
            >
              <ImageIcon className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive("blockquote")}
              isDisabled={editor.state.selection.empty && !editor.isActive("blockquote")}
              title="Quote (select text first)"
            >
              <Quote className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Lists */}
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive("bulletList")}
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive("orderedList")}
              title="Ordered List"
            >
              <ListOrdered className="w-4 h-4" />
            </ToolbarButton>
          </div>
        </div>
      )}

      {/* Editor Content Area */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <input
            id="heading"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            placeholder="Title"
            className="w-full text-4xl font-merriweather font-bold bg-transparent border-0 focus:ring-0 placeholder:text-zinc-300 mb-6 outline-none leading-relaxed tracking-wide"
            required
            autoComplete="off"
          />

          {/* Cover Image URL */}
          <input
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Cover image URL (required)"
            className="w-full text-sm text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder:text-zinc-400 mb-6 outline-none"
            required
            autoComplete="off"
          />

          {/* Image Preview - 16:9 aspect ratio, centered, smaller */}
          {formData.imageUrl && !imageError && (
            <div className="mb-8 flex justify-center">
              <div className="w-4/5 aspect-video">
                <img
                  src={formData.imageUrl}
                  alt="Cover Preview"
                  className="w-full h-full object-cover rounded-xl border border-zinc-200"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </div>
            </div>
          )}

          {/* Rich Text Editor */}
          <div className="min-h-[400px]">
            <EditorContent
              editor={editor}
              className="tiptap prose prose-zinc max-w-none min-h-[400px] focus:outline-none text-lg"
            />
          </div>
        </form>
      </main>

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-zinc-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-semibold text-zinc-800">Preview</h2>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-zinc-600" />
              </button>
            </div>

            {/* Modal Content - Blog Preview */}
            <div className="p-6 md:p-10">
              {/* Cover Image - 16:9 aspect ratio, centered, smaller */}
              {formData.imageUrl && !imageError && (
                <div className="mb-8 flex justify-center">
                  <div className="w-4/5 aspect-video">
                    <img
                      src={formData.imageUrl}
                      alt="Blog Cover Preview"
                      className="w-full h-full object-cover rounded-xl"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                    />
                  </div>
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-merriweather font-bold text-zinc-800 mb-6 leading-relaxed tracking-wide">
                {formData.heading || (
                  <span className="text-zinc-300">Title</span>
                )}
              </h1>

              {/* Content */}
              <div
                className="prose prose-zinc max-w-none text-lg font-merriweather leading-loose tracking-wide"
                dangerouslySetInnerHTML={{
                  __html:
                    formData.content ||
                    '<p class="text-zinc-300">Start writing...</p>',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
