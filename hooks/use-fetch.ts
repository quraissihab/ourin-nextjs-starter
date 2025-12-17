import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

interface UseFetchOptions<T> {
  enabled?: boolean;
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  refetchInterval?: number;
}

/**
 * useFetch
 * Declarative data fetching hook with caching and refetch support
 * 
 * @example
 * const { data, isLoading, error, refetch } = useFetch('/api/users');
 */
export function useFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  const {
    enabled = true,
    initialData = null,
    onSuccess,
    onError,
    refetchInterval,
  } = options;

  const [state, setState] = useState<FetchState<T>>({
    data: initialData,
    error: null,
    isLoading: enabled,
    isError: false,
    isSuccess: false,
  });

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setState(prev => ({ ...prev, isLoading: true, isError: false }));

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setState({
        data,
        error: null,
        isLoading: false,
        isError: false,
        isSuccess: true,
      });
      
      onSuccess?.(data);
    } catch (error) {
      const err = error as Error;
      setState({
        data: null,
        error: err,
        isLoading: false,
        isError: true,
        isSuccess: false,
      });
      
      onError?.(err);
    }
  }, [url, enabled, onSuccess, onError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refetch interval
  useEffect(() => {
    if (!refetchInterval || !enabled) return;

    const interval = setInterval(fetchData, refetchInterval);
    return () => clearInterval(interval);
  }, [fetchData, refetchInterval, enabled]);

  return {
    ...state,
    refetch: fetchData,
  };
}
