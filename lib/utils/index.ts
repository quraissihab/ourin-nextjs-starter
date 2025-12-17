/**
 * Utility Functions - Barrel Export
 * Re-export all utilities from a single entry point
 */

// Class name merger (shadcn)
export { cn } from '../utils';

// Formatting utilities
export {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatFileSize,
  formatPhoneNumber,
  formatCompact,
  formatDuration,
} from './format';

// Validation utilities
export {
  isEmail,
  isURL,
  isPhone,
  isEmpty,
  isNumeric,
  validatePassword,
  isNIK,
  isNPWP,
  isValidDate,
} from './validation';

// Date utilities
export {
  formatDate,
  formatRelativeTime,
  isToday,
  isYesterday,
  daysBetween,
  addDays,
  addMonths,
  startOfDay,
  endOfDay,
  toISODateString,
  getAge,
} from './date';

// String utilities
export {
  capitalize,
  capitalizeWords,
  slugify,
  truncate,
  removeAccents,
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  randomString,
  generateUUID,
  maskString,
  wordCount,
  reverseString,
  isPalindrome,
  getInitials,
} from './string';

// Array utilities
export {
  chunk,
  unique,
  uniqueBy,
  shuffle,
  groupBy,
  sortBy,
  intersection,
  difference,
  flatten,
  flattenDeep,
  randomItem,
  randomItems,
  first,
  last,
  removeAt,
  remove,
  move,
  sum,
  average,
  min,
  max,
} from './array';

// Object utilities
export {
  pick,
  omit,
  deepClone,
  deepMerge,
  isEqual,
  isEmptyObject,
  get,
  set,
  flattenObject,
  invert,
  mapValues,
  filterObject,
} from './object';

// Number utilities
export {
  clamp,
  randomBetween,
  randomFloatBetween,
  roundTo,
  isEven,
  isOdd,
  inRange,
  toRadians,
  toDegrees,
  lerp,
  mapRange,
  percentage,
  distance,
  ordinal,
  padNumber,
  isPositive,
  isNegative,
  sign,
  factorial,
  gcd,
  lcm,
} from './number';

// Storage utilities
export {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  clearStorage,
  hasStorageItem,
  getStorageKeys,
  getStorageSize,
  setStorageItemWithExpiry,
  getStorageItemWithExpiry,
} from './storage';

// API utilities
export {
  fetcher,
  createApiClient,
  apiClient,
  handleApiError,
  get as apiGet,
  post,
  put,
  patch,
  del,
  buildQueryString,
  sleep,
  retry,
  type ApiError,
  type ApiResponse,
} from './api';

// Color utilities
export {
  hexToRgb,
  rgbToHex,
  hexToHsl,
  hslToHex,
  lightenColor,
  darkenColor,
  hexToRgba,
  getContrastRatio,
  isLightColor,
  getTextColorForBg,
  randomColor,
  mixColors,
} from './color';

// DOM utilities
export {
  scrollToTop,
  scrollToElement,
  copyToClipboard,
  downloadFile,
  downloadFromUrl,
  isInViewport,
  getOffsetTop,
  lockBodyScroll,
  unlockBodyScroll,
  getScrollPercentage,
  isMobile,
  isTouchDevice,
  getPreferredColorScheme,
  createFocusTrap,
  printElement,
} from './dom';

// Browser detection utilities (New in v1.2)
export {
  isServer,
  isBrowser,
  isMobile as isMobileDevice,
  isIOS,
  isAndroid,
  isTouchDevice as hasTouchScreen,
  isSafari,
  isChrome,
  isFirefox,
  prefersReducedMotion,
  prefersDarkMode,
  getDevicePixelRatio,
  supportsWebGL,
  supportsWebP,
  supportsIntersectionObserver,
  getConnectionType,
  isOnline,
  getBatteryLevel,
} from './browser';

// Async utilities (New in v1.2)
export {
  sleep as delay,
  retry as retryAsync,
  withTimeout,
  parallelLimit,
  debounce,
  throttle,
  memoize,
  createDeferred,
  poll,
  once,
} from './async';

// Crypto utilities (New in v1.2)
export {
  uuid,
  nanoid,
  randomString as generateRandomString,
  sha256,
  sha512,
  base64Encode,
  base64Decode,
  generateToken,
  xorEncrypt,
  timingSafeEqual,
  maskString as maskSensitiveData,
  maskEmail,
  generateCSRFToken,
} from './crypto';

