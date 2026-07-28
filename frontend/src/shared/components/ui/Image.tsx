import type { ComponentProps } from "react";

interface ImageProps extends ComponentProps<"div"> {
  src: string;
  alt?: string;
  imageClass?: string;
}

export const Image = ({ src, alt, imageClass, ...props }: ImageProps) => {
  return (
    <div {...props}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full ${imageClass ? imageClass : "object-cover"}`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};
