# PeakUI

**A lightweight, zero-dependency, Just-In-Time CSS utility framework — built entirely for the client side.**

> *No build steps. No bundlers. No configuration files. Just drop in a script tag and start building.*

---

## Table of Contents

- [What is PeakUI?](#what-is-peakui)
- [Why PeakUI?](#why-peakui)
- [Getting Started](#getting-started)
- [Core Concepts](#core-concepts)
  - [Utility Classes](#utility-classes)
  - [Responsive Design](#responsive-design)
  - [Dark Mode](#dark-mode)
  - [Pseudo-Classes & States](#pseudo-classes--states)
  - [Modifiers — Combining Everything](#modifiers--combining-everything)
- [Color System](#color-system)
- [Spacing & Sizing](#spacing--sizing)
- [Typography](#typography)
- [Layout](#layout)
  - [Flexbox](#flexbox)
  - [Grid](#grid)
  - [Positioning](#positioning)
- [Backgrounds & Gradients](#backgrounds--gradients)
- [Borders, Outlines & Shadows](#borders-outlines--shadows)
- [Filters & Backdrop Filters](#filters--backdrop-filters)
- [Transitions & Animations](#transitions--animations)
- [Opacity, Transform & Scale](#opacity-transform--scale)
- [Accessibility](#accessibility)
- [Extra Module — `peakui_extra.js`](#extra-module--peakui_extrajs)
  - [Extra Colors](#extra-colors)
  - [Ready-Made Components](#ready-made-components)
    - [btn](#btn)
    - [card](#card)
    - [navbar](#navbar)
    - [dropdown](#dropdown)
    - [accordion](#accordion)
    - [alert](#alert)
    - [badge](#badge)
    - [input](#input)
    - [switch](#switch)
- [Extending PeakUI](#extending-peakui)
  - [Custom Rules](#custom-rules)
  - [Custom Prefix Map](#custom-prefix-map)
  - [Custom Colors](#custom-colors)
  - [Custom Components](#custom-components)
- [Debug Mode](#debug-mode)
- [API Reference](#api-reference)
- [Performance](#performance)
- [Security](#security)
- [Browser Support](#browser-support)
- [License](#license)

---

## What is PeakUI?

PeakUI is a **Just-In-Time (JIT) CSS utility framework** that runs entirely in the browser. It scans the DOM for class names, generates the required CSS on demand, and injects it into a `<style>` tag — all at runtime, with no build toolchain required.

It draws inspiration from utility-first frameworks like Tailwind CSS but is designed for environments where a build step is impractical or undesirable: rapid prototyping, plain HTML files, CMS-based projects, browser-only demos, and anywhere you want styling to just work without a Node.js pipeline.

---

## Why PeakUI?

| Feature | PeakUI |
|---|---|
| Zero dependencies | ✅ |
| No build step | ✅ |
| Just-In-Time generation | ✅ |
| Responsive utilities | ✅ |
| Dark mode support | ✅ |
| Pseudo-class modifiers | ✅ |
| Fluid / clamp-based sizes | ✅ |
| OKLCH color system | ✅ |
| MutationObserver (dynamic content) | ✅ |
| Extendable via plugin API | ✅ |
| Ready-made UI components (opt-in) | ✅ via `peakui_extra.js` |
| File size | ~1 JS file, no CSS downloads |
| Security hardened | ✅ |

---

## Getting Started

### 1. Include the script

Place `peakui.js` at the bottom of your `<body>` (or use `defer`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My App</title>
</head>
<body>

  <div class="flex items-center justify-between px-6 py-4 bg-blue-600 text-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold">Hello, PeakUI</h1>
    <button class="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-blue-50">
      Get Started
    </button>
  </div>

  <script src="peakui.js"></script>
</body>
</html>
```

That's it. No `npm install`. No config file. No compilation.

### 2. Optionally include the extra module

If you want ready-made components (buttons, cards, navbars, etc.) and additional color palettes, include `peakui_extra.js` **before** `peakui.js`:

```html
<script src="peakui_extra.js"></script>
<script src="peakui.js"></script>
```

---

## Core Concepts

### Utility Classes

PeakUI works by reading the `class` attributes of every element in the DOM and generating the corresponding CSS on-the-fly. Classes follow a simple, predictable pattern:

```
[breakpoint:]  [dark:]  [state:]  utility
```

Examples:

```html
<div class="flex items-center gap-4 p-6 bg-gray-100 rounded-xl">
  ...
</div>
```

### Responsive Design

PeakUI provides six breakpoints, all **mobile-first** (`min-width`):

| Prefix | Min Width |
|---|---|
| `xs:` | 480px |
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

```html
<div class="text-sm md:text-lg xl:text-2xl">
  Responsive text
</div>

<div class="flex-col md:flex-row">
  Stacks on mobile, side-by-side on tablet and up
</div>
```

### Dark Mode

PeakUI automatically detects the user's system preference (`prefers-color-scheme: dark`) and stores the user's manual choice in `localStorage`. To toggle dark mode from JavaScript:

```js
// Enable dark mode
document.documentElement.classList.add('dark');
localStorage.setItem('theme', 'dark');

// Disable dark mode
document.documentElement.classList.remove('dark');
localStorage.setItem('theme', 'light');
```

Use the `dark:` prefix in your markup:

```html
<div class="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
  Automatically adapts to dark mode.
</div>
```

### Pseudo-Classes & States

PeakUI supports a wide range of CSS pseudo-classes and pseudo-elements as modifiers:

| Modifier | CSS Equivalent |
|---|---|
| `hover:` | `:hover` |
| `focus:` | `:focus` |
| `active:` | `:active` |
| `disabled:` | `:disabled` |
| `checked:` | `:checked` |
| `first:` | `:first-child` |
| `last:` | `:last-child` |
| `odd:` | `:nth-child(odd)` |
| `even:` | `:nth-child(even)` |
| `placeholder:` | `::placeholder` |
| `before:` | `::before` |
| `after:` | `::after` |
| `selection:` | `::selection` |
| `focus-visible:` | `:focus-visible` |
| `focus-within:` | `:focus-within` |
| `empty:` | `:empty` |
| `required:` | `:required` |
| `invalid:` | `:invalid` |
| `valid:` | `:valid` |
| `read-only:` | `:read-only` |
| `has-placeholder:` | `:placeholder-shown` |
| `first-of-type:` | `:first-of-type` |
| `last-of-type:` | `:last-of-type` |
| `only-child:` | `:only-child` |
| `marker:` | `::marker` |
| `first-letter:` | `::first-letter` |

### Modifiers — Combining Everything

Modifiers are chained with colons `:` and can be stacked:

```html
<!-- Hover state -->
<button class="bg-blue-600 hover:bg-blue-700">Click me</button>

<!-- Dark + hover -->
<div class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">...</div>

<!-- Responsive + hover -->
<button class="bg-blue-500 md:hover:bg-blue-600">...</button>

<!-- Focus visible (for keyboard accessibility) -->
<button class="focus-visible:ring-2 focus-visible:ring-blue-500">...</button>
```

---

## Color System

PeakUI uses the **OKLCH color space** for perceptually uniform color palettes. Each named color ships with 11 shades (`50` through `950`) plus a base value:

```
{color}-50   (lightest)
{color}-100
{color}-200
{color}-300
{color}-400
{color}-500  (base, same as {color})
{color}-600
{color}-700
{color}-800
{color}-900
{color}-950  (darkest)
```

**Built-in color palettes:**

`red` · `orange` · `amber` · `yellow` · `rose` · `pink` · `blue` · `sky` · `cyan` · `teal` · `indigo` · `green` · `emerald` · `lime` · `violet` · `purple` · `fuchsia` · `slate` · `gray` · `brown` · `sand`

Plus: `white`, `black`, `transparent`, `current`, `inherit`

**Color utilities** — apply colors to text, background, border, and more:

```html
<p class="text-blue-600 dark:text-blue-400">Blue text</p>
<div class="bg-rose-100 dark:bg-rose-900">Rose background</div>
<div class="border border-solid border-color-green-400">Green border</div>
<span class="decoration-purple-500">Purple underline</span>
```

**Opacity modifier on colors** — use the `/` separator:

```html
<div class="bg-blue-500/50">50% opacity blue background</div>
<p class="text-red-600/75">75% opacity red text</p>
```

**Color-based shadows and rings:**

```html
<div class="shadow-blue-500">Colored drop shadow</div>
<div class="ring-emerald-400">Colored ring (focus ring)</div>
<div class="inset-shadow-purple-300">Colored inner shadow</div>
<p class="text-shadow-rose-500">Colored text shadow</p>
```

**Gradients:**

```html
<div class="bg-gradient-to-r from-blue-500 to-purple-600">
  Left-to-right gradient
</div>

<div class="bg-gradient-to-br from-rose-400 via-orange-300 to-yellow-200">
  Diagonal gradient with via stop
</div>
```

Available gradient directions: `to-t`, `to-tr`, `to-r`, `to-br`, `to-b`, `to-bl`, `to-l`, `to-tl`

---

## Spacing & Sizing

### Numeric Spacing

Spacing follows a `0.25rem` scale (1 unit = 4px):

```html
<div class="p-4">      <!-- padding: 1rem -->
<div class="m-8">      <!-- margin: 2rem -->
<div class="gap-6">    <!-- gap: 1.5rem -->
<div class="pt-2 pb-4 px-6"> <!-- fine-grained padding -->
```

Supported range: `1` through `96` (0.25rem → 24rem)

### Fluid / Clamp Spacing

For responsive spacing without breakpoints, use the built-in `clamp-*` tokens:

| Token | Value |
|---|---|
| `clamp-xs` | `clamp(0.5rem, 2vw, 1rem)` |
| `clamp-sm` | `clamp(1rem, 4vw, 2rem)` |
| `clamp-md` | `clamp(1.5rem, 6vw, 3rem)` |
| `clamp-lg` | `clamp(2rem, 8vw, 4rem)` |
| `clamp-xl` | `clamp(3rem, 12vw, 6rem)` |
| `clamp-2xl` | `clamp(4rem, 16vw, 8rem)` |

```html
<section class="py-clamp-lg px-clamp-md">...</section>
```

### Width & Height

```html
<div class="w-full h-screen">          <!-- 100% width, 100vh height -->
<div class="w-1/2 h-64">              <!-- 50% width, 16rem height -->
<div class="min-w-xs max-w-lg">       <!-- min/max width using size tokens -->
<div class="w-dvw h-dvh">             <!-- dynamic viewport units -->
```

Size tokens: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`, `full`, `screen`, `min`, `max`, `fit`, `auto`

### Arbitrary Values

Wrap custom values in square brackets:

```html
<div class="w-[320px] h-[calc(100vh-4rem)] p-[1.25rem]">...</div>
```

---

## Typography

### Font Size

All font sizes use fluid `clamp()` values — they scale smoothly between viewport sizes:

```html
<p class="text-sm">Small text</p>
<p class="text-base">Base text</p>
<p class="text-xl">Extra large</p>
<p class="text-4xl">Heading size</p>
<p class="text-9xl">Display size</p>
```

Available sizes: `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`, `8xl`, `9xl`

Pixel values also work:

```html
<p class="text-20">20px text</p>
```

### Font Weight

```html
<p class="font-thin">100</p>
<p class="font-light">300</p>
<p class="font-normal">400</p>
<p class="font-medium">500</p>
<p class="font-semibold">600</p>
<p class="font-bold">700</p>
<p class="font-black">900</p>
```

### Font Family

```html
<p class="font-sans">System sans-serif stack</p>
<p class="font-serif">System serif stack</p>
<p class="font-mono">System monospace stack</p>
```

### Text Utilities

```html
<p class="text-left">Left aligned</p>
<p class="text-center">Centered</p>
<p class="text-right">Right aligned</p>
<p class="uppercase">UPPERCASE</p>
<p class="lowercase">lowercase</p>
<p class="capitalize">Capitalize</p>
<p class="truncate">Truncated with ellipsis...</p>
<p class="line-clamp-3">Clamped to three lines with ellipsis</p>
<p class="tracking-wide">Wide letter spacing</p>
<p class="leading-none">Line height 1</p>
<p class="underline decoration-dotted">Dotted underline</p>
<p class="italic">Italic</p>
<p class="antialiased">Smooth font rendering</p>
```

### Text Shadows

```html
<h1 class="text-shadow">Default text shadow</h1>
<h1 class="text-shadow-lg text-shadow-blue-500">Large colored text shadow</h1>
```

Available sizes: `2xs`, `xs`, `sm`, *(none)*, `md`, `lg`, `xl`, `2xl`, `none`

---

## Layout

### Flexbox

```html
<!-- Container -->
<div class="flex items-center justify-between gap-4">

<!-- Direction -->
<div class="flex flex-col">
<div class="flex flex-row-reverse">

<!-- Wrapping -->
<div class="flex flex-wrap">

<!-- Alignment -->
<div class="flex items-start justify-end">
<div class="flex items-stretch content-between">

<!-- Children -->
<div class="flex-1">Grow to fill</div>
<div class="flex-none">Fixed size</div>
<div class="shrink-0">Won't shrink</div>
<div class="self-center">Align self</div>
```

### Grid

```html
<!-- Template columns -->
<div class="grid grid-cols-3 gap-4">
<div class="grid grid-cols-12 gap-2">

<!-- Spanning -->
<div class="col-span-2">Spans 2 columns</div>
<div class="row-span-3">Spans 3 rows</div>

<!-- Template rows -->
<div class="grid grid-rows-4">

<!-- Auto flow -->
<div class="grid grid-flow-col">

<!-- Place items -->
<div class="grid place-items-center">
```

### Bootstrap-Compatible Grid

PeakUI includes a 12-column grid system compatible with Bootstrap's row/col pattern:

```html
<div class="row">
  <div class="col-12 md:col-6 lg:col-4">...</div>
  <div class="col-12 md:col-6 lg:col-4">...</div>
  <div class="col-12 md:col-12 lg:col-4">...</div>
</div>
```

### Positioning

```html
<div class="relative">
  <div class="absolute top-4 right-4">Positioned</div>
</div>

<div class="fixed bottom-6 right-6 z-50">Floating button</div>
<div class="sticky top-0">Sticky header</div>
```

### Container

```html
<!-- Responsive container (fluid below breakpoint, fixed above) -->
<div class="container-md mx-auto px-4">...</div>
```

Available: `container`, `container-xs`, `container-sm`, `container-md`, `container-lg`, `container-xl`, `container-2xl`

---

## Backgrounds & Gradients

```html
<!-- Solid color -->
<div class="bg-blue-500">Blue background</div>

<!-- Gradient -->
<div class="bg-gradient-to-r from-blue-500 to-purple-600">Gradient</div>

<!-- Background sizing & positioning -->
<div class="bg-cover bg-center bg-no-repeat">Image background</div>

<!-- Background clip -->
<h1 class="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
  Gradient text
</h1>
```

---

## Borders, Outlines & Shadows

### Borders

```html
<div class="border border-solid border-color-gray-300">Default border</div>
<div class="border-2 border-dashed border-color-blue-400">Dashed 2px</div>
<div class="border-t-4 border-color-t-red-500">Top border only</div>
```

Border width range: `0`, `px`, `1`–`16`

### Border Radius

All radii use fluid `clamp()` values:

```html
<div class="rounded">Default</div>
<div class="rounded-sm">Small</div>
<div class="rounded-lg">Large</div>
<div class="rounded-full">Fully rounded (pill / circle)</div>
<div class="rounded-t-xl">Top corners only</div>
<div class="rounded-tl-md">Top-left only</div>
```

### Shadows

```html
<div class="shadow-2xs">Barely-there shadow</div>
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-2xl">Massive shadow</div>
<div class="shadow-inner">Inner shadow</div>
<div class="shadow-none">Remove shadow</div>

<!-- Color shadows -->
<div class="shadow-blue-500">Colored shadow</div>
<div class="ring-green-400">Focus ring</div>
```

### Outlines

```html
<button class="outline-none focus-visible:outline-2 focus-visible:outline-color-blue-500">
  Accessible button
</button>
```

### Dividers

Add borders between flex/grid children:

```html
<div class="flex divide-solid border-color-gray-200">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</div>
```

---

## Filters & Backdrop Filters

```html
<!-- CSS filters on elements -->
<img class="blur-4">
<img class="brightness-125">
<img class="contrast-150">
<img class="grayscale-100">
<img class="sepia-50">
<img class="hue-rotate-90">
<img class="saturate-200">

<!-- Backdrop filters (on element's background) -->
<div class="backdrop-blur-8 backdrop-brightness-75">
  Frosted glass effect
</div>
```

---

## Transitions & Animations

```html
<!-- Transitions -->
<div class="transition hover:bg-blue-600">Default transition</div>
<div class="transition-colors duration-300 ease-in-out">Colors only</div>
<div class="transition-all duration-500 delay-100">All properties</div>
<div class="transition-transform ease-back">With overshoot easing</div>

<!-- Built-in animations -->
<div class="animate-spin">Spinning loader icon</div>
<div class="animate-pulse">Pulsing skeleton</div>
<div class="animate-bounce">Bouncing indicator</div>
<div class="animate-ping">Ping notification dot</div>
```

**Duration values:** `75`, `100`, `150`, `200`, `300`, `500`, `700`, `1000` ms

**Easing functions:** `ease-linear`, `ease-in`, `ease-out`, `ease-in-out`, `ease-back` (overshoot), `ease-circ` (circular), `ease-expo` (exponential)

---

## Opacity, Transform & Scale

```html
<!-- Opacity -->
<div class="opacity-0">Hidden</div>
<div class="opacity-50">Half visible</div>
<div class="opacity-100">Fully visible</div>

<!-- Translate -->
<div class="translate-x-10">Shifted right 10px</div>
<div class="translate-y-50">Shifted down 50px</div>

<!-- Rotate -->
<div class="rotate-45">45 degrees</div>
<div class="-rotate-90">-90 degrees</div>

<!-- Scale -->
<div class="scale-75">Scaled to 75%</div>
<div class="scale-125">Scaled to 125%</div>

<!-- Skew -->
<div class="skew-x-12">Skewed on X axis</div>
```

---

## Accessibility

```html
<!-- Visually hidden (screen-reader only) -->
<span class="sr-only">Skip to main content</span>

<!-- Undo sr-only -->
<span class="not-sr-only">Visible again</span>

<!-- Reduce motion (handled automatically via CSS) -->
<!-- PeakUI respects prefers-reduced-motion for scroll-behavior -->
```

---

## Extra Module — `peakui_extra.js`

`peakui_extra.js` is an **optional add-on** that extends PeakUI with:

- Additional color palettes
- Ready-made UI components (`btn`, `card`, `navbar`, `dropdown`, `accordion`, `alert`, `badge`, `input`, `switch`)
- A pattern for adding your own custom rules, prefixes, colors, and components

**Load order — `peakui_extra.js` must come first:**

```html
<script src="peakui_extra.js"></script>
<script src="peakui.js"></script>
```

---

### Extra Colors

`peakui_extra.js` adds the following additional OKLCH palettes (all with full `50`–`950` scale):

| Palette | Description |
|---|---|
| `mauve` | Warm purple-tinted neutral |
| `stone` | Warm greige neutral |
| `neutral` | Pure achromatic gray |
| `warmGray` | Slightly warm gray |
| `coolGray` | Blue-shifted gray |
| `blueGray` | Slate-blue neutral |

Usage is identical to built-in colors:

```html
<div class="bg-stone-100 text-stone-800 dark:bg-stone-900 dark:text-stone-100">
  Stone themed card
</div>
```

---

### Ready-Made Components

Components are utility classes that generate complete, styled CSS blocks. They follow the pattern:

```
component-colorName
```

All components are **dark mode aware** and support **responsive breakpoint prefixes**.

---

#### `btn`

A fully styled button with hover, active, and disabled states.

```html
<button class="btn-blue">Primary</button>
<button class="btn-rose">Danger</button>
<button class="btn-emerald">Success</button>
<a href="#" class="btn-gray">Link Button</a>
```

Features: hover darkening, active press effect, disabled grayscale, works on any element.

---

#### `card`

A structured content card with image, header, meta, description, and footer slots.

```html
<div class="card-blue">
  <div class="image"><img src="photo.jpg" alt="..."></div>
  <div class="content">
    <span class="header">Card Title</span>
    <span class="meta">Posted on April 20, 2026</span>
    <p class="description">Card body text goes here.</p>
  </div>
  <div class="extra">
    <img class="avatar" src="avatar.jpg" alt="User">
    <span>Jane Doe</span>
    <span class="right floated">5 min read</span>
  </div>
</div>
```

CSS slots: `.image`, `.content`, `.header`, `.meta`, `.description`, `.extra`, `.avatar`, `.icon`, `.input`

Add `.card-shadow` to the wrapper to include a colored drop shadow.

---

#### `navbar`

A responsive navigation bar with dropdown and nested sub-menu support, and a hamburger menu for mobile.

```html
<nav class="navbar-blue">
  <div class="nav-container">
    <a href="#" class="nav-logo">Brand</a>
    <button class="burger-btn" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-list">
      <li><a href="#" class="nav-item">Home</a></li>
      <li><a href="#" class="nav-item">About</a></li>

      <!-- Dropdown -->
      <li>
        <button class="nav-item dropdown-trigger">
          Products <span class="arrow">▼</span>
        </button>
        <ul class="dropdown-menu">
          <li><a href="#" class="nav-item">Product A</a></li>
          <li><a href="#" class="nav-item">Product B</a></li>

          <!-- Nested sub-menu -->
          <li>
            <button class="nav-item dropdown-trigger">
              More <span class="arrow">▼</span>
            </button>
            <ul class="dropdown-menu">
              <li><a href="#" class="nav-item">Sub Item</a></li>
            </ul>
          </li>
        </ul>
      </li>

      <li><a href="#" class="nav-item">Contact</a></li>
    </ul>
  </div>
</nav>
```

- Hamburger menu auto-activates below 768px.
- Dropdowns open on click, close when clicking outside or pressing `Escape`.
- Click/resize handlers are attached automatically — no extra JavaScript needed.

---

#### `dropdown`

A standalone dropdown widget, independent of the navbar.

```html
<div class="dropdown-teal">
  <button class="dd-toggle">Options</button>
  <div class="dd-menu">
    <a href="#" class="dd-item">Edit</a>
    <a href="#" class="dd-item">Duplicate</a>
    <div class="dd-divider"></div>
    <a href="#" class="dd-item">Delete</a>
  </div>
</div>

<!-- Right-aligned menu -->
<div class="dropdown-violet">
  <button class="dd-toggle">Menu</button>
  <div class="dd-menu right">
    <a href="#" class="dd-item">Profile</a>
    <a href="#" class="dd-item">Settings</a>
  </div>
</div>
```

CSS slots: `.dd-toggle`, `.dd-menu`, `.dd-menu.right`, `.dd-item`, `.dd-divider`

Toggles on click, closes on outside click or `Escape`.

---

#### `accordion`

A CSS-native accordion using hidden checkboxes — zero JavaScript required.

```html
<div class="accordion-blue">

  <div class="acc-item">
    <input type="checkbox" class="acc-trigger" id="acc1">
    <label class="acc-header" for="acc1">What is PeakUI?</label>
    <div class="acc-content">
      <div class="acc-inner">
        PeakUI is a JIT CSS utility framework that works entirely in the browser.
      </div>
    </div>
  </div>

  <div class="acc-item">
    <input type="checkbox" class="acc-trigger" id="acc2">
    <label class="acc-header" for="acc2">Do I need a build tool?</label>
    <div class="acc-content">
      <div class="acc-inner">
        No. Drop in a single script tag and you're done.
      </div>
    </div>
  </div>

</div>
```

CSS slots: `.acc-item`, `.acc-trigger` (hidden checkbox), `.acc-header` (label), `.acc-content`, `.acc-inner`

---

#### `alert`

A colored inline alert / notification banner.

```html
<div class="alert-blue">ℹ️ This is an informational message.</div>
<div class="alert-rose">🚨 Something went wrong. Please try again.</div>
<div class="alert-emerald">✅ Your changes have been saved.</div>
<div class="alert-amber">⚠️ Your subscription expires soon.</div>
```

---

#### `badge`

A small inline label / tag.

```html
<span class="badge-blue">New</span>
<span class="badge-rose">Hot</span>
<span class="badge-green">Active</span>
<span class="badge-gray">Draft</span>
```

---

#### `input`

A styled text input with focus color accent.

```html
<input type="text" class="input-blue" placeholder="Your email">
<input type="password" class="input-rose" placeholder="Password">
<textarea class="input-teal" placeholder="Your message"></textarea>
```

Features: clean border, smooth focus ring in the chosen color, placeholder styling.

---

#### `switch`

A toggle switch component. Requires a checkbox inside a `<label>` with a `.slider` sibling.

```html
<label class="switch-blue">
  <input type="checkbox">
  <div class="slider"></div>
  <span>Enable notifications</span>
</label>

<label class="switch-green">
  <input type="checkbox" checked>
  <div class="slider"></div>
  <span>Dark mode</span>
</label>
```

Features: smooth animation, focus-visible outline for keyboard users, theme color on checked state.

---

## Extending PeakUI

PeakUI exposes four global hooks that must be defined **before** `peakui.js` loads.

### Custom Rules

Add static class-to-CSS mappings:

```js
// In your own script or in peakui_extra.js, before peakui.js
window.PeakUIExtraRules = {
  'card-glass': 'background: rgba(255,255,255,0.15); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.2)',
  'text-balance': 'text-wrap: balance',
  'scrollbar-hidden': 'scrollbar-width: none'
};
```

Usage:

```html
<div class="card-glass">Frosted glass panel</div>
```

### Custom Prefix Map

Add dynamic utility prefixes (map a prefix to a CSS property):

```js
window.PeakUIExtraPrefix = {
  'columns': 'column-count',
  'col-gap': 'column-gap',
  'tab-size': 'tab-size'
};
```

Usage:

```html
<article class="columns-3 col-gap-8">Three-column text</article>
```

### Custom Colors

Add new named colors using PeakUI's built-in OKLCH color scale generator:

```js
window.PeakUIExtraColors = {
  main: function(peak) {
    return {
      // Full 11-shade scale using OKLCH
      ...peak._colorScale('brand', 0.55, 0.18, 220),

      // Or a single custom color
      'brand-accent': 'oklch(65% 0.22 200)',
      'brand-muted': '#8ba3c0'
    };
  }
};
```

The `_colorScale(name, l, c, h)` helper generates `name-50` through `name-950` from the given OKLCH `L`, `C`, and `H` base values.

### Custom Components

Add fully custom component generators:

```js
window.PeakUIExtraComponents = {
  // Generates styles for class="tooltip-blue", "tooltip-rose", etc.
  'tooltip': function(utility, value, modifier, safeUtility, peak) {
    const color = value && peak.colors[value] ? peak.colors[value] : 'oklch(20% 0 0)';
    const textColor = 'oklch(98% 0 0)';

    return [
      `.${modifier}${safeUtility} { position: relative; display: inline-block; }`,
      `.${modifier}${safeUtility}::before { content: attr(data-tip); position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: ${color}; color: ${textColor}; padding: 0.4em 0.8em; border-radius: 0.375rem; font-size: 0.75rem; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s; margin-bottom: 6px; }`,
      `.${modifier}${safeUtility}:hover::before { opacity: 1; }`
    ].join('');
  }
};
```

Usage:

```html
<button class="tooltip-gray" data-tip="This is a tooltip">Hover me</button>
```

The component function receives:

| Parameter | Description |
|---|---|
| `utility` | The full class name, e.g. `tooltip-blue` |
| `value` | The part after the prefix, e.g. `blue` |
| `modifier` | Breakpoint prefix string, e.g. `md\:` or `""` |
| `safeUtility` | CSS-escaped version of the class name |
| `peak` | The PeakUI instance (access `peak.colors`, `peak._colorScale()`, `peak._cleanColor()`, etc.) |

Return a CSS string or `null` to skip.

---

## Debug Mode

PeakUI automatically enables debug mode when running on `localhost`, `127.0.0.1`, or a `file://` URL. In debug mode it logs:

- Total initialization time
- Per-update render counts and style tag size
- A full JS + CSS + render time in milliseconds

```
PeakUI-JS-Time: 3.2ms
Added 12 new rules, total size: 4.18 KB
🔥 (JS + CSS + Render): 5.41 ms
```

No configuration required — it's automatic in development, silent in production.

---

## API Reference

The PeakUI instance is available globally as `window.peak` after initialization.

| Method / Property | Description |
|---|---|
| `peak.colors` | Object of all registered color names → OKLCH values |
| `peak.rules` | Object of all static class → CSS mappings |
| `peak.prefixMap` | Object of all dynamic prefix → CSS property mappings |
| `peak.spacing` | Object of spacing scale values |
| `peak.fontSize` | Object of fluid font size values |
| `peak.breakPoints` | Object of responsive breakpoint values |
| `peak.scanCss(context?)` | Manually scan a DOM context for new classes |
| `peak.renderStylesIncremental()` | Manually flush pending classes to CSS |
| `peak.destroy()` | Remove all generated styles and stop the observer |
| `peak._colorScale(name, l, c, h)` | Generate an 11-shade OKLCH color scale |
| `peak._cleanColor(value)` | Resolve a color name to its CSS value |

---

## Performance

PeakUI is designed to be fast and non-blocking:

- **Static caches** — the rule map, prefix map, and color palette are built once and shared across all instances.
- **Incremental rendering** — only new, unseen class names are processed on each cycle.
- **Debounced MutationObserver** — DOM changes are batched with a 50ms debounce before triggering a style update.
- **LRU-style cache trimming** — if more than 10,000 unique classes are tracked, the oldest 1,000 are evicted to prevent unbounded memory growth.
- **`requestAnimationFrame` guarding** — the initial-load flag is cleared asynchronously to prevent unnecessary observer triggers during first render.
- **Single style tag** — all generated CSS is appended to one `<style id="peak-ui-jit">` tag via string concatenation, minimizing reflow.

---

## Security

PeakUI applies several hardening measures to prevent CSS injection attacks:

- **CSS value sanitization** — all dynamic values are validated against a strict allowlist regex and scanned for dangerous patterns (`expression()`, `javascript:`, `url(data:`, script injection, etc.).
- **Selector escaping** — class names are escaped using `CSS.escape()` before use as CSS selectors.
- **Prototype pollution prevention** — key names are checked against a forbidden list (`__proto__`, `constructor`, `prototype`, etc.) before use as object keys.
- **Color validation** — only known named colors, hex values, and recognized CSS color functions are accepted; anything else resolves to `transparent`.

---

## Browser Support

PeakUI requires a modern browser with support for:

- `CSS.escape()`
- `MutationObserver`
- `requestAnimationFrame`
- OKLCH color space (Chrome 111+, Firefox 113+, Safari 15.4+)
- CSS `clamp()`
- `localStorage` (optional — gracefully ignored if unavailable)

---

## License

PeakUI is released under the **MIT License**.

```
MIT License

Copyright (c) 2026 Atakan Koc <peakui@proton.me>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

*Built with care by [Atakan Koc](mailto:peakui@proton.me) — 2026*
