/**
 * Async & Promise Utilities
 * Helpers for working with async operations
 */

/**
 * Sleep/delay for specified milliseconds
 * @example
 * await sleep(1000); // Wait 1 second
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 * @example
 * const data = await retry(() => fetchData(), { attempts: 3, delay: 1000 });
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: { attempts?: number; delay?: number; backoff?: number } = {}
): Promise<T> {
  const { attempts = 3, delay = 1000, backoff = 2 } = options;
  
  let lastError: Error | undefined;
  
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err as Error;
      if (i < attempts - 1) {
        await sleep(delay * Math.pow(backoff, i));
      }
    }
  }
  
  throw lastError;
}

/**
 * Create a timeout wrapper for a promise
 * @example
 * const data = await withTimeout(fetchData(), 5000);
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  errorMessage = 'Operation timed out'
): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(errorMessage)), ms)
  );
  return Promise.race([promise, timeout]);
}

/**
 * Execute promises in parallel with a concurrency limit
 * @example
 * const results = await parallelLimit(urls.map(url => () => fetch(url)), 5);
 */
export async function parallelLimit<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];
  
  for (const task of tasks) {
    const p = Promise.resolve().then(() => task()).then(result => {
      results.push(result);
    });
    executing.push(p);
    
    if (executing.length >= limit) {
      await Promise.race(executing);
      executing.splice(
        executing.findIndex(p => 
          p.then(() => true).catch(() => true)
        ),
        1
      );
    }
  }
  
  await Promise.all(executing);
  return results;
}

/**
 * Debounce a function
 * @example
 * const debouncedSearch = debounce(search, 300);
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle a function
 * @example
 * const throttledScroll = throttle(handleScroll, 100);
 */
export function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Memoize a function with cache
 * @example
 * const memoizedCalc = memoize(expensiveCalculation);
 */
export function memoize<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  keyResolver?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>) => {
    const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Create a deferred promise (manually resolvable)
 * @example
 * const deferred = createDeferred<string>();
 * deferred.resolve('done');
 */
export function createDeferred<T>() {
  let resolve: (value: T) => void;
  let reject: (reason?: unknown) => void;
  
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  
  return { promise, resolve: resolve!, reject: reject! };
}

/**
 * Poll a function until condition is met
 * @example
 * await poll(() => checkStatus(), status => status === 'complete', 1000);
 */
export async function poll<T>(
  fn: () => Promise<T> | T,
  condition: (result: T) => boolean,
  interval: number,
  maxAttempts = Infinity
): Promise<T> {
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    const result = await fn();
    if (condition(result)) return result;
    await sleep(interval);
    attempts++;
  }
  
  throw new Error('Polling exceeded max attempts');
}

/**
 * Execute a function once and cache result
 * @example
 * const getConfig = once(() => loadConfig());
 */
export function once<T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;
  
  return ((...args: Parameters<T>) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  }) as T;
}
