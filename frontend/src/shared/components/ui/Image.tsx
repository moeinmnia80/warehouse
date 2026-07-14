import type { ComponentProps } from "react";

interface ImageProps extends ComponentProps<"div"> {
  /* img src */
  src: string;
  /* img alt is optional */
  alt?: string;
  /* img className for custom class */
  imageClass?: string;
  /* another attribute related to div tag with ...props for parent */
}

export const Image = ({ src, alt, imageClass, ...props }: ImageProps) => {
  return (
    <div {...props}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full ${imageClass ? imageClass : "object-cover"}`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
