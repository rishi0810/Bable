export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://bable-backend.vercel.app";

export const buildApiUrl = (path) => {
  if (!path) {
    return API_BASE_URL;
  }

  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
