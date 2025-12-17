import { useState, useEffect, useCallback } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

/**
 * useElementSize
 * Track the size of an element using ResizeObserver
 * 
 * @example
 * const { ref, width, height } = useElementSize();
 * return <div ref={ref}>Resizable content</div>
 */
export function useElementSize<T extends HTMLElement = HTMLElement>() {
  const [ref, setRef] = useState<T | null>(null);
  const [size, setSize] = useState<Dimensions>({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    observer.observe(ref);
    
    // Set initial size
    setSize({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });

    return () => observer.disconnect();
  }, [ref]);

  return {
    ref: setRef,
    ...size,
  };
}
