/**
 * Crypto & Security Utilities
 * Helpers for hashing, encryption, and security
 */

/**
 * Generate a UUID v4
 * @example
 * const id = uuid(); // "550e8400-e29b-41d4-a716-446655440000"
 */
export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Generate a nanoid-style short unique ID
 * @example
 * const id = nanoid(); // "V1StGXR8_Z5jdHi6B-myT"
 */
export function nanoid(size = 21): string {
  const alphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
  let id = '';
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  for (let i = 0; i < size; i++) {
    id += alphabet[bytes[i] & 63];
  }
  return id;
}

/**
 * Generate a random string
 * @example
 * const token = randomString(32); // "a1b2c3d4..."
 */
export function randomString(length: number, charset?: string): string {
  const chars = charset || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, byte => chars[byte % chars.length]).join('');
}

/**
 * Hash a string using SHA-256
 * @example
 * const hash = await sha256('password'); // "5e884898..."
 */
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Hash a string using SHA-512
 */
export async function sha512(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-512', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Base64 encode a string
 * @example
 * const encoded = base64Encode('hello'); // "aGVsbG8="
 */
export function base64Encode(str: string): string {
  if (typeof btoa !== 'undefined') {
    return btoa(unescape(encodeURIComponent(str)));
  }
  return Buffer.from(str, 'utf-8').toString('base64');
}

/**
 * Base64 decode a string
 * @example
 * const decoded = base64Decode('aGVsbG8='); // "hello"
 */
export function base64Decode(str: string): string {
  if (typeof atob !== 'undefined') {
    return decodeURIComponent(escape(atob(str)));
  }
  return Buffer.from(str, 'base64').toString('utf-8');
}

/**
 * Generate a secure random token
 * @example
 * const token = generateToken(32); // "a3f8b2c1..."
 */
export function generateToken(length: number): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Simple XOR encryption (NOT for production security!)
 * For demo/obfuscation purposes only
 */
export function xorEncrypt(text: string, key: string): string {
  return Array.from(text)
    .map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    )
    .join('');
}

/**
 * Compare two strings in constant time (timing-safe)
 * Prevents timing attacks on string comparison
 */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Mask sensitive data (like credit cards, emails)
 * @example
 * maskString('4111111111111111', 4, 4); // "4111********1111"
 * maskEmail('john@example.com'); // "j***@example.com"
 */
export function maskString(
  str: string,
  visibleStart: number,
  visibleEnd: number,
  maskChar = '*'
): string {
  if (str.length <= visibleStart + visibleEnd) return str;
  const start = str.slice(0, visibleStart);
  const end = str.slice(-visibleEnd);
  const masked = maskChar.repeat(str.length - visibleStart - visibleEnd);
  return start + masked + end;
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const maskedLocal = local.charAt(0) + '***';
  return `${maskedLocal}@${domain}`;
}

/**
 * Generate a CSRF token
 */
export function generateCSRFToken(): string {
  return generateToken(32);
}
