/**
 * Browser & Device Utilities
 * Helpers for detecting browser features and device capabilities
 */

/**
 * Check if code is running on the server (SSR)
 */
export const isServer = typeof window === 'undefined';

/**
 * Check if code is running in the browser
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Check if device is mobile (user agent based)
 */
export function isMobile(): boolean {
  if (isServer) return false;
  return /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Check if device is iOS
 */
export function isIOS(): boolean {
  if (isServer) return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

/**
 * Check if device is Android
 */
export function isAndroid(): boolean {
  if (isServer) return false;
  return /Android/.test(navigator.userAgent);
}

/**
 * Check if device supports touch
 */
export function isTouchDevice(): boolean {
  if (isServer) return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Check if browser is Safari
 */
export function isSafari(): boolean {
  if (isServer) return false;
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

/**
 * Check if browser is Chrome
 */
export function isChrome(): boolean {
  if (isServer) return false;
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}

/**
 * Check if browser is Firefox
 */
export function isFirefox(): boolean {
  if (isServer) return false;
  return navigator.userAgent.toLowerCase().includes('firefox');
}

/**
 * Check if device prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (isServer) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if device prefers dark mode
 */
export function prefersDarkMode(): boolean {
  if (isServer) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Get device pixel ratio
 */
export function getDevicePixelRatio(): number {
  if (isServer) return 1;
  return window.devicePixelRatio || 1;
}

/**
 * Check if browser supports WebGL
 */
export function supportsWebGL(): boolean {
  if (isServer) return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Check if browser supports WebP images
 */
export async function supportsWebP(): Promise<boolean> {
  if (isServer) return false;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.width > 0 && img.height > 0);
    img.onerror = () => resolve(false);
    img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  });
}

/**
 * Check if browser supports Intersection Observer
 */
export function supportsIntersectionObserver(): boolean {
  if (isServer) return false;
  return 'IntersectionObserver' in window;
}

/**
 * Get network connection type (if available)
 */
export function getConnectionType(): string | null {
  if (isServer) return null;
  const nav = navigator as Navigator & {
    connection?: { effectiveType?: string };
  };
  return nav.connection?.effectiveType || null;
}

/**
 * Check if online
 */
export function isOnline(): boolean {
  if (isServer) return true;
  return navigator.onLine;
}

/**
 * Get battery level (if supported)
 */
export async function getBatteryLevel(): Promise<number | null> {
  if (isServer) return null;
  
  const nav = navigator as Navigator & {
    getBattery?: () => Promise<{ level: number }>;
  };
  
  if (!nav.getBattery) return null;
  
  try {
    const battery = await nav.getBattery();
    return battery.level;
  } catch {
    return null;
  }
}
