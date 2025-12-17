import { useEffect, useRef, useCallback } from 'react';

/**
 * useInterval
 * Declarative setInterval with pause support
 * 
 * @example
 * useInterval(() => console.log('tick'), 1000);
 * useInterval(() => console.log('tick'), isActive ? 1000 : null);
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
