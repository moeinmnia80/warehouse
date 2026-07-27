import { useEffect, useRef } from "react";

export function useScrolled<T extends HTMLElement>(threshold = 10) {
  const ref = useRef<T>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        ref.current?.classList.toggle(
          "is-scrolled",
          window.scrollY > threshold,
        );
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return ref;
}
