/**
 * Sticky header behavior (shadow/background transition on scroll).
 *
 * NOTE: We use direct DOM mutation via useRef instead of React state here.
 * WHY:
 * 1. Performance: Scroll events fire rapidly. Updating React state would trigger
 *    a re-render of the entire Header and all its children (NavLinks, UserMenu, etc.)
 *    on every scroll frame, leading to jank.
 * 2. Zero-Re-render: By toggling the 'is-scrolled' class directly on the DOM node,
 *    we achieve the visual effect with zero React renders.
 * 3. Separation of Concerns: Since no other component needs 'isScrolled' as data,
 *    lifting this into React state is unnecessary overhead.
 *
 * IF NEEDED LATER: If a child component ever needs to react to the scroll state
 * as data (e.g., hiding a floating button), convert this to a standard useState
 * hook and wrap children in React.memo() to prevent unnecessary re-renders.
 */

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
