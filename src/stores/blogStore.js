import { create } from "zustand";
import { buildApiUrl } from "../lib/api.js";

const createBlogState = (overrides = {}) => ({
  blog: null,
  loading: true,
  error: null,
  isImageExpanded: false,
  ...overrides,
});

export const useBlogStore = create((set) => ({
  ...createBlogState(),
  resetForNextBlog: () => {
    set(
      createBlogState({
        loading: true,
      })
    );
  },
  setImageExpanded: (isImageExpanded) => {
    set({ isImageExpanded });
  },
  fetchBlog: async (id, signal) => {
    if (!id) {
      set(
        createBlogState({
          loading: false,
          error: "No id",
        })
      );
      return;
    }

    try {
      const response = await fetch(
        buildApiUrl(`/blog/blog-content?id=${encodeURIComponent(id)}`),
        { signal }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch blog: ${response.status}`);
      }

      const data = await response.json();

      if (!data) {
        throw new Error("Blog not found");
      }

      set(
        createBlogState({
          blog: data,
          loading: false,
          error: null,
        })
      );
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }

      console.error("Error fetching blog:", error);
      set(
        createBlogState({
          loading: false,
          error: error.message || "Could not load blog",
        })
      );
    }
  },
}));
