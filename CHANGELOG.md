# Changelog

All notable changes to the PeakUI project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Under Consideration
- Visual playground / sandbox
- Figma plugin for design tokens
- Server-side rendering compatibility
- Dark mode transition animations

---

## [1.0.0] - 2026-04-20

### 🎉 Initial Release

After months of development, PeakUI 1.0.0 is finally here! A zero-dependency, Just-In-Time CSS utility framework that works entirely in the browser.

### ✨ Added

#### Core Features
- **JIT CSS Generation Engine** - Scans DOM and generates CSS on-demand
- **Zero Dependencies** - No npm, no build tools, no configuration files
- **Single Script Tag** - Just drop `peakui.js` and start building
- **Automatic DOM Monitoring** - MutationObserver detects dynamic content changes

#### Color System (OKLCH)
- **20+ Color Palettes** - red, orange, amber, yellow, rose, pink, blue, sky, cyan, teal, indigo, green, emerald, lime, violet, purple, fuchsia, slate, gray, brown, sand
- **11 Shades per Color** - 50 through 950 for each palette
- **Base Colors** - white, black, transparent, current, inherit
- **Opacity Modifiers** - Color opacity using `/` separator (e.g., `bg-blue-500/50`)
- **Color Utilities** - text, background, border, outline, decoration, accent, caret, fill, stroke

#### Responsive Design
- **6 Breakpoints** - xs (480px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Mobile-First** - All breakpoints use `min-width` media queries
- **Container Queries** - Responsive containers for each breakpoint
- **Fluid Typography** - All font sizes use `clamp()` for responsive scaling

#### Dark Mode
- **Automatic Detection** - Respects `prefers-color-scheme` system preference
- **Manual Toggle** - localStorage persistence for user preferences
- **Dark Prefix** - Simple `dark:` modifier for dark mode specific styles
- **Seamless Integration** - Works with all utilities and components

#### Pseudo-Classes & States (30+ modifiers)
- **Interaction States** - hover, active, focus, focus-visible, focus-within
- **Form States** - disabled, enabled, checked, required, optional, invalid, valid, read-only, indeterminate, autofill, placeholder-shown
- **Structural States** - first-child, last-child, odd, even, only-child, first-of-type, last-of-type, empty
- **Pseudo-Elements** - before, after, placeholder, selection, marker, first-letter
- **Root & Target** - root, target

#### Layout Utilities (70+ classes)
- **Display** - inline, block, inline-block, flow-root, flex, inline-flex, grid, inline-grid, contents, hidden
- **Position** - static, fixed, absolute, relative, sticky
- **Visibility** - visible, invisible, collapse
- **Overflow** - auto, hidden, clip, visible, scroll (with x/y variants)
- **Object Fit & Position** - contain, cover, fill, none, scale-down (with position variants)

#### Flexbox & Grid
- **Flex Direction** - row, row-reverse, col, col-reverse
- **Flex Wrap** - nowrap, wrap, wrap-reverse
- **Flex Properties** - flex-1, auto, initial, none, grow, shrink
- **Order** - first, last, none (with numeric order values)
- **Alignment** - justify-*, items-*, content-*, self-* (all variants)
- **Grid Template** - grid-cols-{n}, grid-rows-{n}
- **Grid Span** - col-span-{n}, row-span-{n}
- **Grid Auto Flow** - row, col, dense, row-dense, col-dense
- **12-Column Bootstrap Grid** - row, col-{n}, offset-{n}

#### Spacing & Sizing
- **Numeric Spacing Scale** - 1 through 96 (0.25rem to 24rem)
- **Margin & Padding** - m, mt, mb, ml, mr, mx, my, ms, me, p, pt, pb, pl, pr, px, py, ps
- **Gap Utilities** - gap, gap-x, gap-y
- **Fluid Spacing** - clamp-xs, clamp-sm, clamp-md, clamp-lg, clamp-xl, clamp-2xl
- **Fluid Fluid Spacing** - clamp-fluid-xs through clamp-fluid-xl
- **Size Tokens** - xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, full, screen, min, max, fit, auto
- **Width & Height** - w, h, min-w, max-w, min-h, max-h, inline, block variants
- **Fractional Sizes** - w-1/2 through w-5/6, h-1/2 through h-5/6

#### Typography
- **Fluid Font Sizes** - xs, sm, base, lg, xl, 2xl through 9xl (all clamp-based)
- **Font Weights** - thin, extralight, light, normal, medium, semibold, bold, extrabold, black
- **Font Families** - sans, serif, mono
- **Text Alignment** - left, center, right, justify
- **Text Transform** - uppercase, lowercase, capitalize, normal-case
- **Text Decoration** - underline, overline, line-through, no-underline
- **Decoration Styles** - solid, double, dotted, dashed, wavy
- **Text Overflow** - truncate, text-ellipsis, text-clip
- **Line Clamp** - line-clamp-1 through line-clamp-6, none
- **Letter Spacing** - tighter, tight, normal, wide, wider, widest
- **Line Height** - none, tight, snug, normal, relaxed, loose
- **Word Break** - normal, break-all, break-keep
- **Text Wrap** - wrap, nowrap, balance, pretty
- **Anti-aliasing** - antialiased, subpixel-antialiased

#### Borders & Outlines
- **Border Widths** - 0, px, 1 through 16 (with directional variants)
- **Border Styles** - solid, dashed, dotted, double, none
- **Border Colors** - All color palettes with directional variants
- **Border Radius** - none, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, full (with directional variants)
- **Outline Widths** - Same as border widths
- **Outline Styles** - solid, dashed, dotted, double, none, hidden
- **Outline Colors** - All color palettes
- **Divide Utilities** - Between children in flex/grid containers

#### Shadows & Effects
- **Box Shadows** - 2xs, xs, sm, default, md, lg, xl, 2xl, inner, inner-md, none
- **Colored Shadows** - shadow-{color} for all color palettes
- **Text Shadows** - 2xs, xs, sm, default, md, lg, xl, 2xl, none
- **Colored Text Shadows** - text-shadow-{color}
- **Ring Effects** - ring-{color} (focus rings)
- **Inset Shadows** - inset-shadow-{color}

#### Filters & Backdrop Filters
- **Standard Filters** - blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate, sepia
- **Backdrop Filters** - backdrop-blur, backdrop-brightness, backdrop-contrast, backdrop-grayscale, backdrop-hue-rotate, backdrop-invert, backdrop-opacity, backdrop-saturate, backdrop-sepia
- **Filter Values** - Numeric values (px for blur, deg for hue-rotate, % for others)

#### Transitions & Animations
- **Transition Properties** - all, colors, opacity, shadow, transform, none
- **Transition Timing** - ease-linear, ease-in, ease-out, ease-in-out, ease-back, ease-circ, ease-expo
- **Transition Duration** - 75, 100, 150, 200, 300, 500, 700, 1000 ms
- **Transition Delay** - Same as duration values
- **Keyframe Animations** - spin, ping, pulse, bounce, none

#### Transforms
- **Translate** - translate-x-{n}, translate-y-{n} (0, 10, 20, 50, 75, 100 px)
- **Rotate** - rotate-{n}, -rotate-{n} (0, 1, 2, 3, 6, 12, 45, 90, 135, 180, 270 deg)
- **Scale** - scale-{n} (0, 50, 75, 100, 125, 150 %)
- **Skew** - skew-x-{n}, skew-y-{n} (0, 10, 20, 50, 75, 100 deg)
- **Transform Origin** - Various origin positions

#### Opacity
- **Opacity Values** - 0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100

#### Gradients
- **Directional Gradients** - to-t, to-tr, to-r, to-br, to-b, to-bl, to-l, to-tl
- **Gradient Variables** - from, via, to (CSS custom properties)
- **Background Clip** - border, padding, content, text

#### Accessibility
- **Screen Reader Only** - sr-only (visually hidden)
- **Not Screen Reader Only** - not-sr-only
- **Reduced Motion** - Respects `prefers-reduced-motion` for scroll-behavior

#### Background Utilities
- **Background Attachment** - fixed, local, scroll
- **Background Position** - top, center, bottom, left, right
- **Background Repeat** - repeat, repeat-x, repeat-y, no-repeat
- **Background Size** - auto, cover, contain

#### Cursor & Pointer Events
- **Cursor** - auto, default, pointer, wait, text, move, help, not-allowed, etc.
- **Pointer Events** - auto, none
- **User Select** - none, text, all, auto
- **Resize** - none, both, vertical, horizontal
- **Appearance** - none, auto

#### Additional Utilities
- **Aspect Ratio** - square, video, auto
- **Box Sizing** - border-box, content-box
- **Float & Clear** - left, right, none, both
- **Isolation** - isolate
- **Object Fit & Position** - Full control
- **Table Layout** - auto, fixed
- **Border Collapse** - collapse, separate
- **List Style** - disc, decimal, none (with position variants)
- **Vertical Align** - baseline, top, middle, bottom, text-top, text-bottom
- **White Space** - normal, nowrap, pre, pre-line, pre-wrap, break-spaces
- **Content** - For pseudo-elements

### 🔧 Performance

- **Static Caching** - Rules, prefixes, and colors built once and shared
- **Incremental Rendering** - Only new classes trigger CSS generation
- **Debounced Observer** - 50ms debounce prevents excessive updates
- **Cache Trimming** - LRU-style eviction at 10,000 unique classes
- **Single Style Tag** - All CSS appended to one tag minimizing reflow
- **requestAnimationFrame** - Initial load flag cleared asynchronously

### 🛡️ Security

- **CSS Value Sanitization** - Strict allowlist regex validation
- **Dangerous Pattern Blocking** - Blocks expression(), javascript:, data: URLs, script tags
- **Selector Escaping** - CSS.escape() for all dynamic selectors
- **Prototype Pollution Prevention** - Forbidden keys blocked (__proto__, constructor, etc.)
- **Color Validation** - Only named colors, hex, and CSS color functions accepted

### 🐛 Fixed

- Initial release - no bug fixes yet

### ⚠️ Known Issues

- None reported for initial release

### 📚 Documentation

- Complete README.md with all utilities and examples
- JSDoc comments for all public methods
- API reference
- Migration guide (N/A for initial release)
- Browser support information

### 🔜 Coming in v1.1.0

- RTL layout support
- CSS Variables theming API
- Plugin system
- Performance benchmarks
- Framework wrappers

---

## [1.0.0-rc.1] - 2026-04-10

### Release Candidate

- Feature complete for v1.0.0
- All core utilities implemented
- Documentation finalized
- Security hardening complete

---

## [1.0.0-beta.3] - 2026-03-25

### Changed
- Optimized color scale generation with caching
- Improved MutationObserver debouncing
- Enhanced CSS sanitization patterns

### Fixed
- Memory leak in cache management
- Edge cases in selector escaping
- Dark mode class application timing

---

## [1.0.0-alpha.1] - 2026-02-01

### Added
- Initial alpha release
- Basic JIT engine
- Core utility classes
- Responsive breakpoints
- Dark mode prototype

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✨ Added | New features |
| 🔧 Changed | Changes to existing functionality |
| 🐛 Fixed | Bug fixes |
| 🔒 Security | Security improvements |
| ⚠️ Deprecated | Soon-to-be removed features |
| 🗑️ Removed | Removed features |
| 🔜 Coming | Planned for future release |

---

## Links

- [GitHub Repository](https://github.com/akoc77/peakui)
- [Documentation](https://github.com/akoc77/peakui#readme)
- [Issue Tracker](https://github.com/akoc77/peakui/issues)
- [License](https://github.com/akoc77/peakui/blob/main/LICENSE)

---

**Maintainer:** Atakan Koc <peakui@proton.me>