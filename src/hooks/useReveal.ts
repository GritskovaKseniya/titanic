import { useEffect, useRef, useState } from 'react';

/** Triggers a "reveal" transition when the element scrolls into view — once by
    default (cards fade in and stay), or every time if `once` is false (for
    something meant to replay on each pass, like SectionSeam's sweep). */
export function useReveal<T extends HTMLElement>(options?: { once?: boolean }): [React.RefObject<T | null>, boolean] {
  const once = options?.once ?? true;
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return [ref, visible];
}
