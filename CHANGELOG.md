# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2024-12-17

### 🚀 Major Update: API Routes, Middleware, Extended Utilities

#### Added

##### Middleware (`middleware.ts`)
- Request logging with timestamps
- Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- CORS headers for API routes
- Protected routes pattern (commented example)
- Rate limiting headers
- Locale detection example
- Maintenance mode example

##### Example API Routes
- **`/api/health`**: Health check endpoint with uptime, version, timestamp
- **`/api/users`**: Full CRUD with pagination, filtering, search
- **`/api/users/[id]`**: Dynamic route for GET, PUT, DELETE operations

##### New Utility Modules (40+ Functions)

**`lib/utils/browser.ts`** — Device & Browser Detection
- `isServer`, `isBrowser`, `isMobile`, `isIOS`, `isAndroid`
- `isTouchDevice`, `isSafari`, `isChrome`, `isFirefox`
- `prefersReducedMotion`, `prefersDarkMode`, `getDevicePixelRatio`
- `supportsWebGL`, `supportsWebP`, `supportsIntersectionObserver`
- `getConnectionType`, `isOnline`, `getBatteryLevel`

**`lib/utils/async.ts`** — Async Helpers
- `sleep`, `retry` (with exponential backoff), `withTimeout`
- `parallelLimit` (concurrency control), `debounce`, `throttle`
- `memoize`, `createDeferred`, `poll`, `once`

**`lib/utils/crypto.ts`** — Security Utilities
- `uuid`, `nanoid`, `randomString`, `generateToken`
- `sha256`, `sha512` (hashing)
- `base64Encode`, `base64Decode`
- `timingSafeEqual`, `maskString`, `maskEmail`, `generateCSRFToken`

##### New Hooks (5 Hooks, Total: 20+)
- **`useNetworkStatus`**: Track online/offline and connection type
- **`useFetch`**: Declarative data fetching with refetch interval
- **`useCountdown`**: Timer with start, pause, reset, restart
- **`useElementSize`**: Track element dimensions with ResizeObserver
- **`useInterval`**: Declarative setInterval with pause support

#### Changed
- Updated utility count from 145+ to 185+ functions
- Updated hook count from 15+ to 20+ hooks
- All new exports added to barrel files

---

## [1.1.0] - 2024-12-17

### 🚀 Major Update: Extended Typography & Premium UI

#### Added

##### 10 New Fonts (Total: 16 Fonts)
- **Display & Headings:**
  - `Space Grotesk` — Tech & bold
  - `Poppins` — Friendly & versatile  
  - `Raleway` — Elegant thin/bold
  - `Manrope` — Modern geometric
- **Body Text:**
  - `Nunito` — Rounded & friendly
  - `DM Sans` — Clean geometric
  - `Source Sans 3` — Adobe's open font
- **Serif:**
  - `Lora` — Contemporary serif
  - `Merriweather` — Screen-optimized
- **Monospace:**
  - `Fira Code` — Ligatures support

##### New UI Components & Sections
- **Animated Stats Section:** Counter animations for utilities, fonts, hooks, and CSS lines.
- **Font Showcase Grid:** Interactive preview of all 16 fonts with hover effects.
- **Enhanced Hero:** Gradient orb backgrounds, animated grid pattern, tech stack pills.
- **CTA Section:** Gradient background with call-to-action buttons.
- **Privacy Policy Page:** Full legal content at `/privacy`.
- **Terms of Service Page:** MIT license explanation at `/terms`.

##### UI Improvements
- Smoother Framer Motion animations with stagger effects.
- Improved floating navbar with scroll-aware transparency.
- Feature cards with hover glow and rotation effects.
- Code block with syntax-highlighted typewriter effect.
- Footer with social icons and multi-column layout.

#### Changed
- Upgraded font count from 6 to 16 fonts.
- Reorganized font CSS variables by category (display, body, serif, mono, hand).
- Updated CopyCommand component with improved styling.
- Enhanced responsive design across all sections.

---

## [1.0.0] - 2024-12-17

### 🎉 Initial Release

This is the first public release of **Ourin**, the ultimate Next.js boilerplate.

#### Added

##### Core Framework
- **Next.js 15/16**: Initialized with the latest App Router, React Server Components, and Turbopack support.
- **TypeScript 5**: Full type safety with strict mode enabled across the entire codebase.
- **Tailwind CSS 4**: Configured with the new Oxide engine for lightning-fast, zero-runtime CSS.
- **Shadcn/UI**: Integrated component system based on Radix UI primitives (Button component included).

##### UI & Components
- **Premium Homepage**: A fully designed landing page with hero section, floating navbar, and bento grid layout.
- **Floating Navigation Bar**: A glassmorphism-styled navbar that hides on scroll down and reappears on scroll up.
- **Theme Toggle**: An animated dark/light mode switcher using `next-themes` and Framer Motion.
- **Copy Command**: A sleek, terminal-style pill component for copying CLI commands.
- **Code Typewriter**: An interactive code block with a realistic typing animation effect.
- **Hero Background**: Animated spotlight and aurora background effects for visual impact.

##### Typography System
- **6-Font Architecture**: Implemented a rich typography system using `next/font/google`:
    - `Outfit` (Display headings)
    - `Plus Jakarta Sans` (Body text)
    - `Playfair Display` (Serif accents)
    - `JetBrains Mono` (Code)
    - `Caveat` (Handwriting)
    - `Inter` (UI labels)

##### Utility Library (145+ Functions)
- **`lib/utils/api.ts`**: Fetch wrapper with error handling, timeouts, and interceptor support.
- **`lib/utils/array.ts`**: Array manipulation (chunk, unique, groupBy, shuffle, intersection, etc.).
- **`lib/utils/color.ts`**: Color conversion (Hex/RGB/HSL) and contrast ratio calculations.
- **`lib/utils/date.ts`**: Relative time formatting ("2 hours ago"), date parsing, and duration formatting.
- **`lib/utils/dom.ts`**: Browser-safe utilities (copyToClipboard, scrollToTop, getScrollPosition).
- **`lib/utils/format.ts`**: Formatting for currency, file sizes, percentages, and phone numbers.
- **`lib/utils/number.ts`**: Clamping, rounding, random number generation, and ordinal suffixes.
- **`lib/utils/object.ts`**: Deep clone, omit, pick, and object merging.
- **`lib/utils/storage.ts`**: Safe localStorage/sessionStorage wrappers with JSON serialization.
- **`lib/utils/string.ts`**: Slugify, truncate, capitalize, case converters, and string validation.
- **`lib/utils/validation.ts`**: Regex patterns for email, URL, phone, password, and credit card validation.

##### Custom Hooks (15 Hooks)
- `useDebounce`: Debounce a value over a specified delay.
- `useThrottle`: Throttle a value to limit updates.
- `useLocalStorage`: Persist state to localStorage with type safety.
- `useMediaQuery`: Track responsive breakpoints in JavaScript.
- `useWindowSize`: Reactive window dimensions.
- `useScrollPosition`: Track vertical scroll position.
- `useOnClickOutside`: Detect clicks outside a referenced element.
- `useHover`: Track hover state on an element.
- `usePrevious`: Access the previous value of a state.
- `useToggle`: Boolean state with a toggle function.
- `useCopyToClipboard`: Copy text to clipboard with success state.
- `useIntersectionObserver`: Track element visibility in the viewport.
- `useKeyboardShortcut`: Bind keyboard shortcuts to callbacks.
- `useAsync`: Handle async operations with loading, error, and data states.

##### CSS Templates (850+ lines in `globals.css`)
- Comprehensive theme variable system for light and dark modes.
- Utility classes: `.glass-card`, `.text-gradient`, `.text-gradient-rainbow`, `.animate-float`, `.shadow-glow-primary`.
- Custom scrollbar styles, skeleton loaders, and line-clamp utilities.

##### Configuration & Boilerplate
- **`config/site.ts`**: Centralized site metadata, navigation links, and social URLs.
- **`constants/index.ts`**: Application-wide constants.
- **`types/index.ts`**: Global TypeScript type definitions.

---

## [Unreleased]

### Planned
- Additional Shadcn/UI components (Card, Input, Dialog, Modal, etc.).
- More page templates (About, Pricing, Blog).
- Authentication integration examples.
- API route examples with Server Actions.
