const CLOUDINARY_HOST = "res.cloudinary.com";
const CLOUDINARY_UPLOAD_MARKER = "/upload/";

const normalizeTransformDimensions = (options = {}) => {
  const { width, height, aspectRatio, ...rest } = options;
  let nextHeight = height;

  if (
    Number.isFinite(width) &&
    !Number.isFinite(height) &&
    Number.isFinite(aspectRatio) &&
    aspectRatio > 0
  ) {
    nextHeight = width / aspectRatio;
  }

  return {
    ...rest,
    width,
    height: nextHeight,
  };
};

export const isCloudinaryUrl = (url) => {
  if (!url) {
    return false;
  }

  try {
    return new URL(url).hostname === CLOUDINARY_HOST;
  } catch {
    return false;
  }
};

const buildTransformationString = ({
  width,
  height,
  crop,
  gravity,
  quality = "auto:good",
  format = "auto",
  dpr = "auto",
} = {}) => {
  const transformations = [`f_${format}`, `q_${quality}`, `dpr_${dpr}`];

  if (Number.isFinite(width)) {
    transformations.push(`w_${Math.round(width)}`);
  }

  if (Number.isFinite(height)) {
    transformations.push(`h_${Math.round(height)}`);
  }

  if (crop) {
    transformations.push(`c_${crop}`);
  }

  if (gravity) {
    transformations.push(`g_${gravity}`);
  }

  return transformations.join(",");
};

export const optimizeCloudinaryUrl = (url, options = {}) => {
  if (!isCloudinaryUrl(url) || !url.includes(CLOUDINARY_UPLOAD_MARKER)) {
    return url;
  }

  const transformationString = buildTransformationString(
    normalizeTransformDimensions(options)
  );

  if (!transformationString) {
    return url;
  }

  return url.replace(
    CLOUDINARY_UPLOAD_MARKER,
    `${CLOUDINARY_UPLOAD_MARKER}${transformationString}/`
  );
};

export const buildCloudinarySrcSet = (url, widths = [], options = {}) => {
  if (!isCloudinaryUrl(url) || widths.length === 0) {
    return undefined;
  }

  return widths
    .map((width) => {
      const nextUrl = optimizeCloudinaryUrl(url, {
        ...options,
        width,
      });

      return `${nextUrl} ${width}w`;
    })
    .join(", ");
};
