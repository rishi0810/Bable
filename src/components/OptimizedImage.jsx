import { memo, useMemo } from "react";
import {
  buildCloudinarySrcSet,
  isCloudinaryUrl,
  optimizeCloudinaryUrl,
} from "../lib/cloudinary.js";

const DEFAULT_WIDTHS = [320, 480, 640, 768, 960, 1200, 1600];

const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  sizes = "100vw",
  widths = DEFAULT_WIDTHS,
  transformOptions,
  className,
  loading = "lazy",
  decoding = "async",
  fetchPriority = "auto",
  ...rest
}) {
  const cloudinarySource = isCloudinaryUrl(src);

  const optimizedSrc = useMemo(() => {
    if (!cloudinarySource) {
      return src;
    }

    const fallbackWidth =
      transformOptions?.width || widths.find((width) => width >= 768) || widths[0];

    return optimizeCloudinaryUrl(src, {
      ...transformOptions,
      width: fallbackWidth,
    });
  }, [cloudinarySource, src, transformOptions, widths]);

  const srcSet = useMemo(() => {
    if (!cloudinarySource) {
      return undefined;
    }

    return buildCloudinarySrcSet(src, widths, transformOptions);
  }, [cloudinarySource, src, transformOptions, widths]);

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={cloudinarySource ? sizes : undefined}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      {...rest}
    />
  );
});

export default OptimizedImage;
