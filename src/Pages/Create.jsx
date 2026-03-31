import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useAuth } from "../hooks/useAuth.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import OptimizedImage from "../components/OptimizedImage.jsx";
import { buildApiUrl } from "../lib/api.js";
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
  const { isAuthenticated, loading } = useAuth();
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

  const isFormValid =
    formData.heading.trim().length > 0 &&
    formData.content.trim().length > 0 &&
    formData.content !== "<p></p>" &&
    formData.content !== "<p><br></p>" &&
    formData.imageUrl.trim().length > 0;
  const previewImageUrl = formData.imageUrl.trim();

  if (loading) {
    return (
      <div className="min-h-screen bg-ed-bg flex items-center justify-center">
        <LoadingSpinner message="Checking your session..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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
        buildApiUrl("/blog/create"),
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
        ? "text-ed-text-tertiary cursor-not-allowed"
        : isActive
          ? "bg-ed-surface-hover text-ed-text"
          : "text-ed-text-secondary hover:bg-ed-surface-hover hover:text-ed-text"
        }`}
      title={title}
    >
      {children}
    </button>
  );

  const ToolbarDivider = () => (
    <div className="w-px h-6 bg-ed-border mx-1" />
  );

  return (
    <div className="min-h-screen bg-ed-surface font-poppins transition-colors duration-300">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-ed-surface border-b border-ed-border px-4 py-3 transition-colors duration-300">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          {/* Left side - Back button */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-ed-surface-hover rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-ed-text-secondary" />
            </button>
          </div>

          {/* Right side - Preview and Publish */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="px-4 py-2 text-sm font-medium text-ed-text-secondary bg-ed-surface-hover hover:bg-ed-border rounded-lg transition-colors"
            >
              Preview
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition-colors ${isFormValid && !isSubmitting
                ? "bg-ed-accent hover:bg-ed-accent-hover cursor-pointer"
                : "bg-ed-text-tertiary cursor-not-allowed"
                }`}
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </header>

      {/* Sticky Toolbar */}
      {editor && (
        <div className="sticky top-[57px] z-40 bg-ed-surface border-b border-ed-border px-4 py-2 transition-colors duration-300">
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
            className="w-full text-4xl font-merriweather font-bold bg-transparent border-0 focus:ring-0 text-ed-text placeholder:text-ed-text-tertiary mb-6 outline-none leading-relaxed tracking-wide"
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
            className="w-full text-sm text-ed-text-secondary bg-ed-surface-hover border border-ed-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-ed-accent focus:border-ed-accent placeholder:text-ed-text-tertiary mb-6 outline-none transition-colors"
            required
            autoComplete="off"
          />

          {/* Image Preview - 16:9 aspect ratio, centered, smaller */}
          {previewImageUrl && !imageError && (
            <div className="mb-8 flex justify-center">
              <div className="w-4/5 aspect-video">
                <OptimizedImage
                  src={previewImageUrl}
                  alt="Cover Preview"
                  className="w-full h-full object-cover rounded-xl border border-ed-border"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 720px, 80vw"
                  widths={[480, 720, 960, 1280]}
                  transformOptions={{
                    height: 405,
                    crop: "fill",
                    gravity: "auto",
                  }}
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
            className="bg-ed-surface rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-ed-surface border-b border-ed-border px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-semibold text-ed-text">Preview</h2>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-ed-surface-hover rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-ed-text-secondary" />
              </button>
            </div>

            {/* Modal Content - Blog Preview */}
            <div className="p-6 md:p-10">
              {/* Cover Image - 16:9 aspect ratio, centered, smaller */}
              {previewImageUrl && !imageError && (
                <div className="mb-8 flex justify-center">
                  <div className="w-4/5 aspect-video">
                    <OptimizedImage
                      src={previewImageUrl}
                      alt="Blog Cover Preview"
                      className="w-full h-full object-cover rounded-xl"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                      loading="eager"
                      fetchPriority="high"
                      sizes="(min-width: 1024px) 720px, 80vw"
                      widths={[480, 720, 960, 1280]}
                      transformOptions={{
                        height: 405,
                        crop: "fill",
                        gravity: "auto",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-merriweather font-bold text-ed-text mb-6 leading-relaxed tracking-wide">
                {formData.heading || (
                  <span className="text-ed-text-tertiary">Title</span>
                )}
              </h1>

              {/* Content */}
              <div
                className="prose prose-zinc max-w-none text-lg font-merriweather leading-loose tracking-wide"
                dangerouslySetInnerHTML={{
                  __html:
                    formData.content ||
                    '<p class="text-ed-text-tertiary">Start writing...</p>',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
