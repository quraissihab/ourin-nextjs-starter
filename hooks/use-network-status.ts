import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * useNetworkStatus
 * Track online/offline status and connection quality
 * 
 * @example
 * const { isOnline, connectionType, effectiveType } = useNetworkStatus();
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [connectionType, setConnectionType] = useState<string | null>(null);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    
    const updateConnectionInfo = () => {
      const nav = navigator as Navigator & {
        connection?: { effectiveType?: string; type?: string };
      };
      setConnectionType(nav.connection?.effectiveType || nav.connection?.type || null);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateConnectionInfo();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return { isOnline, connectionType };
}
