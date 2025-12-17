import { useState, useCallback, useRef, useEffect } from 'react';

interface UseCountdownOptions {
  interval?: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

interface UseCountdownReturn {
  count: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  restart: () => void;
}

/**
 * useCountdown
 * Countdown timer with start, pause, reset controls
 * 
 * @example
 * const { count, isRunning, start, pause, reset } = useCountdown(60);
 */
export function useCountdown(
  initialCount: number,
  options: UseCountdownOptions = {}
): UseCountdownReturn {
  const { interval = 1000, onComplete, autoStart = false } = options;
  
  const [count, setCount] = useState(initialCount);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (count <= 0) return;
    setIsRunning(true);
  }, [count]);

  const pause = useCallback(() => {
    setIsRunning(false);
    clear();
  }, [clear]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setCount(initialCount);
    clear();
  }, [initialCount, clear]);

  const restart = useCallback(() => {
    reset();
    setTimeout(start, 0);
  }, [reset, start]);

  useEffect(() => {
    if (isRunning && count > 0) {
      intervalRef.current = setInterval(() => {
        setCount(prev => {
          if (prev <= 1) {
            clear();
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, interval);
    }
    return clear;
  }, [isRunning, count, interval, onComplete, clear]);

  return { count, isRunning, start, pause, reset, restart };
}
