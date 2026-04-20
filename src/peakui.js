/* jshint esversion: 11 */
/* global localStorage, location, performance, document, window, MutationObserver, console  */
/* global clearTimeout, setTimeout, CSS, NodeFilter, requestAnimationFrame  */
/* global PeakUIExtraRules, PeakUIExtraPrefix, PeakUIExtraColors, PeakUIExtraComponents */
/*! PeakUi v1.0 | MIT License | Copyright (c) 2026 Atakan Koc peakui@proton.me */
/*! @version 1.0.0 — Security & Performance Optimized */
/*! @description JIT CSS utility framework — client-side only, no external dependencies */

/**
 * PeakUi - Just-In-Time CSS Utility Framework
 * 
 * A lightweight, zero-dependency CSS framework that generates styles on-demand
 * based on classes found in the DOM. Supports responsive design, dark mode,
 * pseudo-classes, and custom theming.
 * 
 * @class PeakUi
 * @author Atakan Koc
 * @version 1.0.0
 * @license MIT
 */

class PeakUi {
	static _staticRules = null;
	static _staticPrefixMap = null;
	static _staticColors = null;
	static _colorScaleCache = new Map();
	static _maxCacheSize = 10000;
	
	static _breakPoints = {
		'xs': '480px',
		'sm': '640px',
		'md': '768px',
		'lg': '1024px',
		'xl': '1280px',
		'2xl': '1536px'
	};
	
	static _fontSize = {
		'xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem)',
		'sm': 'clamp(0.8125rem, 0.75rem + 0.31vw, 0.875rem)',
		'base': 'clamp(0.875rem, 0.8rem + 0.38vw, 1rem)',
		'lg': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
		'xl': 'clamp(1.125rem, 1rem + 0.63vw, 1.25rem)',
		'2xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
		'3xl': 'clamp(1.5rem, 1.3rem + 1vw, 1.875rem)',
		'4xl': 'clamp(1.875rem, 1.6rem + 1.38vw, 2.25rem)',
		'5xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3rem)',
		'6xl': 'clamp(3rem, 2.5rem + 2.5vw, 3.75rem)',
		'7xl': 'clamp(3.75rem, 3rem + 3.75vw, 4.5rem)',
		'8xl': 'clamp(4.5rem, 3.5rem + 5vw, 6rem)',
		'9xl': 'clamp(6rem, 4.5rem + 7.5vw, 8rem)'
	};
	
	static _sizes = {
		'3xs': 'clamp(14rem, 16rem, 18rem)',
		'2xs': 'clamp(16rem, 18rem, 20rem)',
		'xs': 'clamp(18rem, 20rem, 22rem)',
		'sm': 'clamp(20rem, 24rem, 28rem)',
		'md': 'clamp(24rem, 28rem, 32rem)',
		'lg': 'clamp(28rem, 32rem, 36rem)',
		'xl': 'clamp(32rem, 36rem, 40rem)',
		'2xl': 'clamp(36rem, 42rem, 48rem)',
		'3xl': 'clamp(40rem, 48rem, 56rem)',
		'4xl': 'clamp(48rem, 56rem, 64rem)',
		'5xl': 'clamp(56rem, 64rem, 72rem)',
		'6xl': 'clamp(64rem, 72rem, 80rem)',
		'7xl': 'clamp(72rem, 80rem, 88rem)',
		'full': '100%', 'screen': '100vw',
		'min': 'min-content', 'max': 'max-content',
		'fit': 'fit-content', 'auto': 'auto'
	};
	
	static _roundedSizes = {
		'none': '0',
		'xs': 'clamp(0.0625rem, 0.25vw, 0.125rem)',
		'sm': 'clamp(0.125rem, 0.5vw, 0.25rem)',
		'md': 'clamp(0.1875rem, 0.75vw, 0.375rem)',
		'lg': 'clamp(0.25rem, 1vw, 0.5rem)',
		'xl': 'clamp(0.375rem, 1.5vw, 0.75rem)',
		'2xl': 'clamp(0.5rem, 2vw, 1rem)',
		'3xl': 'clamp(0.75rem, 3vw, 1.5rem)',
		'4xl': 'clamp(1rem, 4vw, 2rem)',
		'full': '9999px'
	};
	
	static _borderSizes = null;
	static _spacing = null;

	constructor() {
		this.debug = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.protocol === 'file:';
		if (this.debug) {
			console.time('PeakUI-JS-Time');
			this._startTime = performance.now();
		}
		
		this.isInitialLoad = true;
		this.observer = null;
		this.rules = {};
		this.prefixMap = {};
		this.colors = {};
		
		this._processedClasses = new Set();
		this._generatedCSS = new Map();
		this._pendingClasses = [];
		this._lastRenderCount = 0;
		
		this.breakPoints = { ...PeakUi._breakPoints };
		this.fontSize = { ...PeakUi._fontSize };
		this.sizes = { ...PeakUi._sizes };
		this.roundedSizes = { ...PeakUi._roundedSizes };
		
		if (!PeakUi._borderSizes) {
			PeakUi._borderSizes = { '0': '0', 'px': '1px' };
			for (let i = 1; i <= 16; i++) PeakUi._borderSizes[i] = `${i}px`;
		}
		this.borderSizes = { ...PeakUi._borderSizes };
		
		if (!PeakUi._spacing) {
			PeakUi._spacing = {};
			for (let i = 1; i <= 96; i++) {
				PeakUi._spacing[i] = `calc(.25rem * ${i})`;
			}

			PeakUi._spacing['clamp-xs'] = 'clamp(0.5rem, 2vw, 1rem)';
			PeakUi._spacing['clamp-sm'] = 'clamp(1rem, 4vw, 2rem)';
			PeakUi._spacing['clamp-md'] = 'clamp(1.5rem, 6vw, 3rem)';
			PeakUi._spacing['clamp-lg'] = 'clamp(2rem, 8vw, 4rem)';
			PeakUi._spacing['clamp-xl'] = 'clamp(3rem, 12vw, 6rem)';
			PeakUi._spacing['clamp-2xl'] = 'clamp(4rem, 16vw, 8rem)';

			PeakUi._spacing['clamp-fluid-xs'] = 'clamp(0.25rem, 1vw, 0.5rem)';
			PeakUi._spacing['clamp-fluid-sm'] = 'clamp(0.5rem, 2vw, 1rem)';
			PeakUi._spacing['clamp-fluid-md'] = 'clamp(1rem, 4vw, 2rem)';
			PeakUi._spacing['clamp-fluid-lg'] = 'clamp(1.5rem, 6vw, 3rem)';
			PeakUi._spacing['clamp-fluid-xl'] = 'clamp(2rem, 8vw, 4rem)';
		}
		
		this.spacing = { ...PeakUi._spacing };

		this.states = {
			'hover': ':hover',
			'active': ':active',
			'focus': ':focus',
			'focus-within': ':focus-within',
			'focus-visible': ':focus-visible',
			'visited': ':visited',
			'target': ':target',
			'disabled': ':disabled',
			'enabled': ':enabled',
			'checked': ':checked',
			'invalid': ':invalid',
			'valid': ':valid',
			'required': ':required',
			'optional': ':optional',
			'read-only': ':read-only',
			'indeterminate': ':indeterminate',
			'autofill': ':autofill',
			'has-placeholder':':placeholder-shown',
			'first': ':first-child',
			'last': ':last-child',
			'odd': ':nth-child(odd)',
			'even': ':nth-child(even)',
			'only-child': ':only-child',
			'first-of-type': ':first-of-type',
			'last-of-type': ':last-of-type',
			'before': '::before',
			'after': '::after',
			'placeholder': '::placeholder',
			'selection': '::selection',
			'marker': '::marker',
			'first-letter': '::first-letter',
			'empty': ':empty',
			'root': ':root'
		};

		this._breakPointSet = new Set(Object.keys(this.breakPoints));
		this._stateSet = new Set(Object.keys(this.states));

		this._validValueRe = /^-?\d*\.?\d+(px|rem|em|%|)$/;
		this._numericRe = /^\d+(\.\d+)?$/;
		this._colorHexRe = /^(#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})|(oklch|rgb|rgba|hsl|hsla)\([^)]+\)|[a-z]+)$/i;
		
		this._criticalUtils = new Set(['sr-only', 'not-sr-only', 'invisible', 'collapse', 'hidden']);

		this.injectBaseStyles();
		this.initDarkMode();
		
		this._initStaticCache();
	}
	

	_initStaticCache() {
		if (!PeakUi._staticRules) {
			PeakUi._staticRules = this._buildRules();
		}
		
		this.rules = { ...PeakUi._staticRules };
		
		if (window.PeakUIExtraRules) {
			this.rules = { ...this.rules, ...window.PeakUIExtraRules };
		}	
		if (!PeakUi._staticPrefixMap) {
			PeakUi._staticPrefixMap = this._buildPrefixMap();
		}
		
		this.prefixMap = { ...PeakUi._staticPrefixMap };
		
		if (window.PeakUIExtraPrefix) {
			this.prefixMap = { ...this.prefixMap, ...window.PeakUIExtraPrefix };
		}
		
		if (!PeakUi._staticColors) {
			PeakUi._staticColors = this._buildColors();
		}
		
		this.colors = { ...PeakUi._staticColors };
		
		if (window.PeakUIExtraColors) {
			this.colors = { ...this.colors, ...window.PeakUIExtraColors['main'](this) };
		}
	}

	_buildRules() {
		const rules = {
			'aspect-square': 'aspect-ratio: 1 / 1',
			'aspect-video': 'aspect-ratio: var(--aspect-video)',
			'aspect-auto': 'aspect-ratio: auto',
			'break-after-auto': 'break-after: auto',
			'break-before-auto': 'break-before: auto',
			'break-inside-auto': 'break-inside: auto',
			'break-inside-avoid': 'break-inside: avoid',
			'box-border': 'box-sizing: border-box',
			'box-content': 'box-sizing: content-box',
			'inline': 'display: inline',
			'block': 'display: block',
			'inline-block': 'display: inline-block',
			'flow-root': 'display: flow-root',
			'flex': 'display: flex',
			'inline-flex': 'display: inline-flex',
			'grid': 'display: grid',
			'inline-grid': 'display: inline-grid',
			'contents': 'display: contents',
			'hidden': 'display: none',
			'float-right': 'float: right',
			'float-left': 'float: left',
			'float-none': 'float: none',
			'clear-left': 'clear: left',
			'clear-right': 'clear: right',
			'clear-both': 'clear: both',
			'clear-none': 'clear: none',
			'isolate': 'isolation: isolate',
			'object-contain': 'object-fit: contain',
			'object-cover': 'object-fit: cover',
			'object-fill': 'object-fit: fill',
			'object-none': 'object-fit: none',
			'object-scale-down': 'object-fit: scale-down',
			'object-top': 'object-position: top',
			'object-left': 'object-position: left',
			'object-center': 'object-position: center',
			'object-right': 'object-position: right',
			'object-bottom': 'object-position: bottom',
			'overflow-auto': 'overflow: auto',
			'overflow-hidden': 'overflow: hidden',
			'overflow-clip': 'overflow: clip',
			'overflow-visible': 'overflow: visible',
			'overflow-scroll': 'overflow: scroll',
			'overflow-x-auto': 'overflow-x: auto',
			'overflow-y-auto': 'overflow-y: auto',
			'overflow-x-hidden': 'overflow-x: hidden',
			'overflow-y-hidden': 'overflow-y: hidden',
			'overflow-x-visible': 'overflow-x: visible',
			'overflow-y-visible': 'overflow-y: visible',
			'overscroll-auto': 'overscroll-behavior: auto',
			'overscroll-contain': 'overscroll-behavior: contain',
			'overscroll-none': 'overscroll-behavior: none',
			'static': 'position: static',
			'fixed': 'position: fixed',
			'absolute': 'position: absolute',
			'relative': 'position: relative',
			'sticky': 'position: sticky',
			'visible': 'visibility: visible',
			'invisible': 'visibility: hidden',
			'collapse': 'visibility: collapse',
			'flex-row': 'flex-direction: row',
			'flex-row-reverse': 'flex-direction: row-reverse',
			'flex-col': 'flex-direction: column',
			'flex-col-reverse': 'flex-direction: column-reverse',
			'flex-nowrap': 'flex-wrap: nowrap',
			'flex-wrap': 'flex-wrap: wrap',
			'flex-wrap-reverse': 'flex-wrap: wrap-reverse',
			'flex-auto': 'flex: auto',
			'flex-initial': 'flex: 0 auto',
			'flex-none': 'flex: none',
			'flex-1': 'flex: 1',
			'grow': 'flex-grow: 1',
			'shrink': 'flex-shrink: 1',
			'order-first': 'order: -9999',
			'order-last': 'order: 9999',
			'order-none': 'order: 0',
			'justify-start': 'justify-content: flex-start',
			'justify-end': 'justify-content: flex-end',
			'justify-center': 'justify-content: center',
			'justify-between': 'justify-content: space-between',
			'justify-around': 'justify-content: space-around',
			'justify-evenly': 'justify-content: space-evenly',
			'justify-stretch': 'justify-content: stretch',
			'justify-items-start': 'justify-items: start',
			'justify-items-end': 'justify-items: end',
			'justify-items-center': 'justify-items: center',
			'justify-items-stretch': 'justify-items: stretch',
			'justify-self-auto': 'justify-self: auto',
			'justify-self-start': 'justify-self: start',
			'justify-self-center': 'justify-self: center',
			'justify-self-end': 'justify-self: end',
			'justify-self-stretch': 'justify-self: stretch',
			'content-center': 'align-content: center',
			'content-start': 'align-content: flex-start',
			'content-end': 'align-content: flex-end',
			'content-between': 'align-content: space-between',
			'content-around': 'align-content: space-around',
			'content-evenly': 'align-content: space-evenly',
			'items-start': 'align-items: flex-start',
			'items-end': 'align-items: flex-end',
			'items-center': 'align-items: center',
			'items-baseline': 'align-items: baseline',
			'items-stretch': 'align-items: stretch',
			'self-auto': 'align-self: auto',
			'self-start': 'align-self: flex-start',
			'self-end': 'align-self: flex-end',
			'self-center': 'align-self: center',
			'self-stretch': 'align-self: stretch',
			'self-baseline': 'align-self: baseline',
			'place-content-center': 'place-content: center',
			'place-content-start': 'place-content: start',
			'place-content-end': 'place-content: end',
			'place-content-between': 'place-content: space-between',
			'place-content-around': 'place-content: space-around',
			'place-content-evenly': 'place-content: space-evenly',
			'place-items-start': 'place-items: start',
			'place-items-end': 'place-items: end',
			'place-items-center': 'place-items: center',
			'place-items-stretch': 'place-items: stretch',
			'place-self-auto': 'place-self: auto',
			'place-self-start': 'place-self: start',
			'place-self-end': 'place-self: end',
			'place-self-center': 'place-self: center',
			'place-self-stretch': 'place-self: stretch',
			'm-auto': 'margin: auto',
			'mx-auto': 'margin-inline: auto',
			'my-auto': 'margin-block: auto',
			'ms-auto': 'margin-inline-start: auto',
			'me-auto': 'margin-inline-end: auto',
			'mt-auto': 'margin-top: auto',
			'mr-auto': 'margin-right: auto',
			'mb-auto': 'margin-bottom: auto',
			'ml-auto': 'margin-left: auto',
			'font-sans': `font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`,
			'font-serif': `font-family: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`,
			'font-mono': `font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
			'antialiased': '-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale',
			'subpixel-antialiased': '-webkit-font-smoothing: auto; -moz-osx-font-smoothing: auto',
			'italic': 'font-style: italic',
			'not-italic': 'font-style: normal',
			'font-thin': 'font-weight: 100',
			'font-extralight': 'font-weight: 200',
			'font-light': 'font-weight: 300',
			'font-normal': 'font-weight: 400',
			'font-medium': 'font-weight: 500',
			'font-semibold': 'font-weight: 600',
			'font-bold': 'font-weight: 700',
			'font-extrabold': 'font-weight: 800',
			'font-black': 'font-weight: 900',
			'tracking-tighter': 'letter-spacing: -0.05em',
			'tracking-tight': 'letter-spacing: -0.025em',
			'tracking-normal': 'letter-spacing: 0em',
			'tracking-wide': 'letter-spacing: 0.025em',
			'tracking-wider': 'letter-spacing: 0.05em',
			'tracking-widest': 'letter-spacing: 0.1em',
			'line-clamp-none': 'overflow: visible; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: unset',
			'leading-none': 'line-height: 1',
			'list-inside': 'list-style-position: inside',
			'list-outside': 'list-style-position: outside',
			'list-disc': 'list-style-type: disc',
			'list-decimal': 'list-style-type: decimal',
			'list-none': 'list-style-type: none',
			'text-left': 'text-align: left',
			'text-center': 'text-align: center',
			'text-right': 'text-align: right',
			'text-justify': 'text-align: justify',
			'underline': 'text-decoration-line: underline',
			'overline': 'text-decoration-line: overline',
			'line-through': 'text-decoration-line: line-through',
			'no-underline': 'text-decoration-line: none',
			'decoration-solid': 'text-decoration-style: solid',
			'decoration-double': 'text-decoration-style: double',
			'decoration-dotted': 'text-decoration-style: dotted',
			'decoration-dashed': 'text-decoration-style: dashed',
			'decoration-wavy': 'text-decoration-style: wavy',
			'uppercase': 'text-transform: uppercase',
			'lowercase': 'text-transform: lowercase',
			'capitalize': 'text-transform: capitalize',
			'normal-case': 'text-transform: none',
			'truncate': 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap',
			'text-ellipsis': 'text-overflow: ellipsis',
			'text-clip': 'text-overflow: clip',
			'text-wrap': 'text-wrap: wrap',
			'text-nowrap': 'text-wrap: nowrap',
			'break-normal': 'word-break: normal',
			'break-all': 'word-break: break-all',
			'break-keep': 'word-break: keep-all',
			'wrap-break-word': 'overflow-wrap: break-word',
			'wrap-anywhere': 'overflow-wrap: anywhere',
			'wrap-normal': 'overflow-wrap: normal',
			'bg-fixed': 'background-attachment: fixed',
			'bg-local': 'background-attachment: local',
			'bg-scroll': 'background-attachment: scroll',
			'bg-clip-border': 'background-clip: border-box',
			'bg-clip-padding': 'background-clip: padding-box',
			'bg-clip-content': 'background-clip: content-box',
			'bg-clip-text': 'background-clip: text',
			'bg-none': 'background-image: none',
			'bg-gradient-to-t': 'background-image: linear-gradient(to top, var(--from), var(--to))',
			'bg-gradient-to-tr': 'background-image: linear-gradient(to top right, var(--from), var(--to))',
			'bg-gradient-to-r': 'background-image: linear-gradient(to right, var(--from), var(--to))',
			'bg-gradient-to-br': 'background-image: linear-gradient(to bottom right, var(--from), var(--to))',
			'bg-gradient-to-b': 'background-image: linear-gradient(to bottom, var(--from), var(--to))',
			'bg-gradient-to-bl': 'background-image: linear-gradient(to bottom left, var(--from), var(--to))',
			'bg-gradient-to-l': 'background-image: linear-gradient(to left, var(--from), var(--to))',
			'bg-gradient-to-tl': 'background-image: linear-gradient(to top left, var(--from), var(--to))',
			'bg-top': 'background-position: top',
			'bg-center': 'background-position: center',
			'bg-bottom': 'background-position: bottom',
			'bg-left': 'background-position: left',
			'bg-right': 'background-position: right',
			'bg-repeat': 'background-repeat: repeat',
			'bg-repeat-x': 'background-repeat: repeat-x',
			'bg-repeat-y': 'background-repeat: repeat-y',
			'bg-no-repeat': 'background-repeat: no-repeat',
			'bg-auto': 'background-size: auto',
			'bg-cover': 'background-size: cover',
			'bg-contain': 'background-size: contain',
			'border-solid': 'border-style: solid',
			'border-dashed': 'border-style: dashed',
			'border-dotted': 'border-style: dotted',
			'border-double': 'border-style: double',
			'border-none': 'border-style: none',
			'border': 'border-width: 1px',
			'rounded': 'border-radius: clamp(0.1875rem, 0.75vw, 0.375rem)',
			'divide-solid': '& > :not(:last-child) { border-style: solid; }',
			'divide-dashed': '& > :not(:last-child) { border-style: dashed; }',
			'divide-dotted': '& > :not(:last-child) { border-style: dotted; }',
			'divide-double': '& > :not(:last-child) { border-style: double; }',
			'divide-none': '& > :not(:last-child) { border-style: none; }',
			'outline-solid': 'outline-style: solid',
			'outline-dashed': 'outline-style: dashed',
			'outline-dotted': 'outline-style: dotted',
			'outline-double': 'outline-style: double',
			'outline-none': 'outline: 2px solid transparent; outline-offset: 2px',
			'outline-hidden': 'outline: 2px solid transparent; outline-offset: 2px',
			'shadow-2xs': 'box-shadow: 0 1px 3px oklch(0% 0 0/0.15), 0 1px 2px oklch(0% 0 0/0.12)',
			'shadow-xs': 'box-shadow: 0 2px 4px oklch(0% 0 0/0.18), 0 1px 2px oklch(0% 0 0/0.14)',
			'shadow-sm': 'box-shadow: 0 2px 6px oklch(0% 0 0/0.20), 0 1px 3px oklch(0% 0 0/0.14)',
			'shadow': 'box-shadow: 0 4px 8px oklch(0% 0 0/0.22), 0 2px 4px oklch(0% 0 0/0.14)',
			'shadow-md': 'box-shadow: 0 6px 12px -1px oklch(0% 0 0/0.24), 0 3px 6px -1px oklch(0% 0 0/0.14)',
			'shadow-lg': 'box-shadow: 0 12px 22px -3px oklch(0% 0 0/0.26), 0 5px 10px -2px oklch(0% 0 0/0.14)',
			'shadow-xl': 'box-shadow: 0 20px 32px -5px oklch(0% 0 0/0.28), 0 10px 14px -5px oklch(0% 0 0/0.14)',
			'shadow-2xl': 'box-shadow: 0 32px 60px -12px oklch(0% 0 0/0.38)',
			'shadow-inner': 'box-shadow: inset 0 2px 6px 0 oklch(0% 0 0/0.20)',
			'shadow-inner-md': 'box-shadow: inset 0 4px 12px 0 oklch(0% 0 0/0.26)',
			'shadow-none': 'box-shadow: 0 0 #0000',
			'text-shadow-2xs': 'text-shadow: 0 1px 2px oklch(0% 0 0/0.26)',
			'text-shadow-xs': 'text-shadow: 0 1px 3px oklch(0% 0 0/0.32)',
			'text-shadow-sm': 'text-shadow: 0 1px 4px oklch(0% 0 0/0.36)',
			'text-shadow': 'text-shadow: 0 2px 5px oklch(0% 0 0/0.38)',
			'text-shadow-md': 'text-shadow: 0 2px 6px oklch(0% 0 0/0.40)',
			'text-shadow-lg': 'text-shadow: 0 3px 8px oklch(0% 0 0/0.45)',
			'text-shadow-xl': 'text-shadow: 0 4px 10px oklch(0% 0 0/0.50)',
			'text-shadow-2xl': 'text-shadow: 0 5px 16px oklch(0% 0 0/0.58)',
			'text-shadow-none': 'text-shadow: 0 0 #0000',
			'border-collapse': 'border-collapse: collapse',
			'border-separate': 'border-collapse: separate',
			'table-auto': 'table-layout: auto',
			'table-fixed': 'table-layout: fixed',
			'sr-only': 'position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip-path: inset(50%);white-space: nowrap;border-width: 0',
			'not-sr-only': 'position: static;width: auto;height: auto;padding: 0;margin: 0;overflow: visible;clip-path: none;white-space: normal',
			'transition': 'transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, translate, scale, rotate, filter, backdrop-filter; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms',
			'transition-all': 'transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms',
			'transition-colors': 'transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms',
			'transition-opacity': 'transition-property: opacity; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms',
			'transition-shadow': 'transition-property: box-shadow; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms',
			'transition-transform': 'transition-property: transform, translate, scale, rotate; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms',
			'transition-none': 'transition-property: none',
			'ease-linear': 'transition-timing-function: linear',
			'ease-in': 'transition-timing-function: cubic-bezier(0.4, 0, 1, 1)',
			'ease-out': 'transition-timing-function: cubic-bezier(0, 0, 0.2, 1)',
			'ease-in-out': 'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)',
			'animate-none': 'animation: none',
			'animate-spin': 'animation: spin 1s linear infinite',
			'animate-ping': 'animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
			'animate-pulse': 'animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			'animate-bounce': 'animation: bounce 1s infinite',
			'duration-initial': 'transition-duration: initial',
			'appearance-none': 'appearance: none',
			'appearance-auto': 'appearance: auto',
			'pointer-events-auto': 'pointer-events: auto',
			'pointer-events-none': 'pointer-events: none',
			'resize-none': 'resize: none',
			'resize': 'resize: both',
			'resize-y': 'resize: vertical',
			'resize-x': 'resize: horizontal',
			'scroll-auto': 'scroll-behavior: auto',
			'scroll-smooth': 'scroll-behavior: smooth',
			'col': 'flex: 1 0 0',
			'col-auto': 'flex: 0 0 auto; width: auto',
			'row': 'display: flex; flex-wrap: wrap; margin-top: -0.5rem; margin-right: -0.75rem; margin-left: -0.75rem',
			'grid-flow-row': 'grid-auto-flow: row',
			'grid-flow-col': 'grid-auto-flow: column',
			'grid-flow-dense': 'grid-auto-flow: dense',
			'grid-flow-row-dense': 'grid-auto-flow: row dense',
			'grid-flow-col-dense': 'grid-auto-flow: column dense',
			'col-start-auto': 'grid-column-start: auto',
			'col-end-auto': 'grid-column-end: auto',
			'row-start-auto': 'grid-row-start: auto',
			'row-end-auto': 'grid-row-end: auto',
			'backdrop-blur-none': 'backdrop-filter: blur(0)',
			'backdrop-grayscale-0': 'backdrop-filter: grayscale(0)',
			'backdrop-invert-0': 'backdrop-filter: invert(0)',
			'ease-back': 'transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55)',
			'ease-circ': 'transition-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86)',
			'ease-expo': 'transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1)',
		};
		
		for (let i = 1; i <= 6; i++) {
			rules[`line-clamp-${i}`] = `overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: ${i};`;
		}

		for (const [size, value] of Object.entries(this.roundedSizes)) {
			rules[`rounded-${size}`] = `border-radius: ${value}`;
		}

		for (const [size, value] of Object.entries(this.borderSizes)) {
			rules[`border-${size}`] = `border-width: ${value}`;
			rules[`border-x-${size}`] = `border-inline-width: ${value}`;
			rules[`border-y-${size}`] = `border-block-width: ${value}`;
			rules[`border-t-${size}`] = `border-top-width: ${value}`;
			rules[`border-r-${size}`] = `border-right-width: ${value}`;
			rules[`border-b-${size}`] = `border-bottom-width: ${value}`;
			rules[`border-l-${size}`] = `border-left-width: ${value}`;
		}
		
		/* eslint-disable no-unused-vars */
		const entries = Object.entries(this.breakPoints);
		entries.forEach(([key, _value], index) => {
			let css = "width: 100%; ";
			entries.slice(index).forEach(([, v]) => { css += `@media (width >= ${v}) { max-width: ${v}; } `; });
			rules[`container-${key}`] = css.trim();
			if (key === 'xs') rules.container = css.trim();
		});
		/* eslint-enable no-unused-vars */
		
		for (let i = 1; i <= 12; i++) {
			const pct = (i / 12 * 100).toFixed(8);
			rules[`offset-${i}`] = `margin-left: ${pct}%`;
			rules[`col-${i}`] = `flex: 0 0 auto; width: ${pct}%`;
		}

		for (let i = 1; i <= 6; i++) {
			const pct = (100 / i).toFixed(8);
			rules[`row-cols-${i}`] = `> * { flex: 0 0 auto; width: ${pct}% }`;
		}

		[0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100].forEach(i => {
			rules[`opacity-${i}`] = `opacity: ${i / 100}`;
		});

		[0, 10, 20, 50, 75, 100].forEach(i => {
			rules[`translate-x-${i}`] = `transform: translateX(${i}px)`;
			rules[`translate-y-${i}`] = `transform: translateY(${i}px)`;
			rules[`skew-x-${i}`] = `transform: skewX(${i}deg)`;
			rules[`skew-y-${i}`] = `transform: skewY(${i}deg)`;
		});

		[0, 1, 2, 3, 6, 12, 45, 90, 135, 180, 270].forEach(i => {
			rules[`rotate-${i}`] = `rotate: ${i}deg`;
			rules[`-rotate-${i}`] = `rotate: -${i}deg`;
		});

		[0, 50, 75, 100, 125, 150].forEach(i => {
			rules[`scale-${i}`] = `scale: ${i / 100}`;
		});

		[[1,2],[1,3],[2,3],[1,4],[2,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,6],[5,6]].forEach(([n, d]) => {
			const pct = (n / d * 100).toFixed(6) + '%';
			rules[`w-${n}/${d}`] = `width: ${pct}`;
			rules[`h-${n}/${d}`] = `height: ${pct}`;
			rules[`basis-${n}/${d}`] = `flex-basis: ${pct}`;
		});

		[75, 100, 150, 200, 300, 500, 700, 1000].forEach(ms => {
			rules[`duration-${ms}`] = `transition-duration: ${ms}ms`;
			rules[`delay-${ms}`] = `transition-delay: ${ms}ms`;
		});

		const configs = {
			prefixes: {
				'w': 'width', 'h': 'height', 'size': ['width', 'height'],
				'inline': 'inline-size', 'inline-block': 'inline-size',
				'min-w': 'min-width', 'max-w': 'max-width',
				'min-h': 'min-height', 'max-h': 'max-height',
				'min-inline': 'min-inline-size', 'max-inline': 'max-inline-size',
				'min-block': 'min-block-size', 'max-block': 'max-block-size'
			},
			values: {
				'auto': 'auto', 'px': '1px', 'full': '100%',
				'screen': (p) => (p.includes('w') || p.includes('inline')) ? '100vw' : '100vh',
				'dvh': '100dvh', 'dvw': '100dvw', 'lvh': '100lvh', 'lvw': '100lvw',
				'svh': '100svh', 'svw': '100svw',
				'min': 'min-content', 'max': 'max-content',
				'fit': 'fit-content', 'lh': '1lh', 'none': 'none'
			}
		};

		for (const [prefix, cssProp] of Object.entries(configs.prefixes)) {
			for (const [key, val] of Object.entries(configs.values)) {
				const finalVal = typeof val === 'function' ? val(prefix) : val;
				const className = `${prefix}-${key}`;
				rules[className] = Array.isArray(cssProp)
					? cssProp.map(p => `${p}: ${finalVal}`).join('; ')
					: `${cssProp}: ${finalVal}`;
			}
		}

		for (const [size, value] of Object.entries(this.fontSize)) {
			rules[`text-${size}`] = `font-size: ${value}`;
		}

		const roundedDirections = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'];
		for (const size of roundedDirections) {
			const value = this.roundedSizes[size];
			if (value) {
				rules[`rounded-t-${size}`] = `border-top-left-radius: ${value}; border-top-right-radius: ${value}`;
				rules[`rounded-r-${size}`] = `border-top-right-radius: ${value}; border-bottom-right-radius: ${value}`;
				rules[`rounded-b-${size}`] = `border-bottom-right-radius: ${value}; border-bottom-left-radius: ${value}`;
				rules[`rounded-l-${size}`] = `border-top-left-radius: ${value}; border-bottom-left-radius: ${value}`;
				rules[`rounded-tl-${size}`] = `border-top-left-radius: ${value}`;
				rules[`rounded-tr-${size}`] = `border-top-right-radius: ${value}`;
				rules[`rounded-br-${size}`] = `border-bottom-right-radius: ${value}`;
				rules[`rounded-bl-${size}`] = `border-bottom-left-radius: ${value}`;
			}
		}

		for (const [size, value] of Object.entries(this.borderSizes)) {
			rules[`outline-${size}`] = `outline-width: ${value}; outline-style: solid`;
		}
		rules['outline-none'] = 'outline: none';
		
		return rules;
	}

	_buildPrefixMap() {
		return {
			'from': '--from', 'to': '--to', 'via': '--via',
			'bg': 'background-color', 'text': 'color',
			'decoration': 'text-decoration-color',
			'border-color': 'border-color',
			'border-color-x': 'border-inline-color',
			'border-color-y': 'border-block-color',
			'border-color-s': 'border-inline-start-color',
			'border-color-e': 'border-inline-end-color',
			'border-color-t': 'border-top-color',
			'border-color-r': 'border-right-color',
			'border-color-b': 'border-bottom-color',
			'border-color-l': 'border-left-color',
			'outline-color': 'outline-color',
			'accent': 'accent-color', 'caret': 'caret-color',
			'fill': 'fill', 'stroke': 'stroke', 'stroke-w': 'stroke-width',
			'aspect': 'aspect-ratio', 'columns': 'columns',
			'break-after': 'break-after', 'break-before': 'break-before', 'break-inside': 'break-inside',
			'box': 'box-sizing', 'float': 'float', 'clear': 'clear',
			'overflow': 'overflow', 'overflowx': 'overflow-x', 'overflowy': 'overflow-y',
			'overscroll': 'overscroll-behavior',
			'p': 'padding', 'pt': 'padding-top', 'pb': 'padding-bottom',
			'pl': 'padding-left', 'pr': 'padding-right',
			'px': 'padding-inline', 'py': 'padding-block', 'ps': 'padding-inline-start',
			'm': 'margin', 'mt': 'margin-top', 'mb': 'margin-bottom',
			'ml': 'margin-left', 'mr': 'margin-right',
			'mx': 'margin-inline', 'my': 'margin-block', 'ms': 'margin-inline-start',
			'gap': 'gap', 'gap-x': 'column-gap', 'gap-y': 'row-gap',
			'w': 'width', 'min-w': 'min-width', 'max-w': 'max-width',
			'h': 'height', 'min-h': 'min-height', 'max-h': 'max-height',
			'size': ['width', 'height'], 'inline': 'inline-size',
			'basis': 'flex-basis', 'grow': 'flex-grow', 'shrink': 'flex-shrink', 'order': 'order',
			'grid-rows': 'grid-template-rows', 'auto-cols': 'grid-auto-columns', 'auto-rows': 'grid-auto-rows',
			'inset': 'inset', 'inset-x': 'inset-inline', 'inset-y': 'inset-block',
			'top': 'top', 'right': 'right', 'bottom': 'bottom', 'left': 'left', 'z': 'z-index',
			'border': 'border-width',
			'border-x': 'border-inline-width', 'border-y': 'border-block-width',
			'border-t': 'border-top-width', 'border-r': 'border-right-width',
			'border-b': 'border-bottom-width', 'border-l': 'border-left-width',
			'rounded': 'border-radius',
			'rounded-t': ['border-top-left-radius', 'border-top-right-radius'],
			'rounded-r': ['border-top-right-radius', 'border-bottom-right-radius'],
			'rounded-b': ['border-bottom-right-radius', 'border-bottom-left-radius'],
			'rounded-l': ['border-top-left-radius', 'border-bottom-left-radius'],
			'rounded-tl': 'border-top-left-radius', 'rounded-tr': 'border-top-right-radius',
			'rounded-br': 'border-bottom-right-radius', 'rounded-bl': 'border-bottom-left-radius',
			'outline-width': 'outline-width', 'outline-offset': 'outline-offset',
			'font': 'font-weight', 'font-family': 'font-family', 'text-size': 'font-size',
			'tracking': 'letter-spacing', 'leading': 'line-height', 'indent': 'text-indent',
			'align': 'vertical-align', 'whitespace': 'white-space',
			'list': 'list-style-type', 'list-position': 'list-style-position',
			'object-fit': 'object-fit', 'object-position': 'object-position',
			'box-shadow': 'box-shadow', 'text-shadow': 'text-shadow',
			'translate': 'translate', 'scale': 'scale', 'rotate': 'rotate', 'skew': 'skew',
			'transform-origin': 'transform-origin',
			'transition': 'transition-property', 'duration': 'transition-duration',
			'ease': 'transition-timing-function', 'delay': 'transition-delay',
			'animate': 'animation', 'opacity': 'opacity', 'cursor': 'cursor',
			'appearance': 'appearance', 'pointer-events': 'pointer-events',
			'user-select': 'user-select', 'isolation': 'isolation',
			'mix-blend': 'mix-blend-mode', 'filter': 'filter', 'field-sizing': 'field-sizing',
			'line-height': 'line-height', 'border-spacing': 'border-spacing', 'content': 'content',
			'animation-timeline': 'animation-timeline', 'scroll-timeline': 'scroll-timeline', 'view-timeline': 'view-timeline',
		};
	}

	_buildColors() {
		const colors = {
			...this._colorScale('red', 0.627, 0.225, 25.9),
			...this._colorScale('orange', 0.741, 0.198, 62.1),
			...this._colorScale('amber', 0.824, 0.179, 83.1),
			...this._colorScale('yellow', 0.923, 0.172, 102.9),
			...this._colorScale('rose', 0.645, 0.256, 16.5),
			...this._colorScale('pink', 0.584, 0.231, 1.0),
			...this._colorScale('blue', 0.624, 0.178, 250.1),
			...this._colorScale('sky', 0.701, 0.158, 230.1),
			...this._colorScale('cyan', 0.748, 0.134, 195.4),
			...this._colorScale('teal', 0.638, 0.117, 175.2),
			...this._colorScale('indigo', 0.457, 0.171, 270.2),
			...this._colorScale('green', 0.697, 0.151, 142.5),
			...this._colorScale('emerald', 0.696, 0.165, 158.5),
			...this._colorScale('lime', 0.849, 0.171, 115.6),
			...this._colorScale('violet', 0.606, 0.260, 282.5),
			...this._colorScale('purple', 0.505, 0.211, 305.9),
			...this._colorScale('fuchsia', 0.667, 0.295, 312.5),
			...this._colorScale('slate', 0.554, 0.046, 257.4),
			...this._colorScale('gray', 0.551, 0.027, 264.364),
			...this._colorScale('brown', 0.491, 0.081, 55.1),
			...this._colorScale('sand', 0.775, 0.085, 72.5),
			'white': 'oklch(100% 0 0)',
			'black': 'oklch(0% 0 0)',
			'transparent': 'transparent',
			'current': 'currentColor',
			'inherit': 'inherit'
		};

		for (const [shadeName, colorValue] of Object.entries(colors)) {
			if (!this._safeKey(shadeName)) continue;
			
			const withAlpha = (v, a) => {
				if (v && typeof v === 'string' && v.startsWith('oklch(') && v.endsWith(')')) {
					return v.replace(/\)$/, ` / ${a})`);
				}
				return v;
			};
			
			this.rules[`shadow-${shadeName}`] = `box-shadow: 0 4px 8px ${withAlpha(colorValue, '0.4')}, 0 2px 4px ${withAlpha(colorValue, '0.2')}`;
			this.rules[`ring-${shadeName}`] = `box-shadow: 0 0 0 3px ${withAlpha(colorValue, '0.4')}`;
			this.rules[`inset-shadow-${shadeName}`] = `box-shadow: inset 0 2px 4px 0 ${colorValue}`;
			this.rules[`text-shadow-${shadeName}`] = `text-shadow: 0 2px 4px ${colorValue}`;
		}

		return colors;
	}

	_colorScale(colorName, l, c, h) {
		const cacheKey = `${colorName}-${l}-${c}-${h}`;
		if (PeakUi._colorScaleCache.has(cacheKey)) {
			return PeakUi._colorScaleCache.get(cacheKey);
		}
		
		const L = l * 100;
		const gap = 100 - L;
		const result = {
			[`${colorName}-50`]: `oklch(98.5% ${Math.min(c * 0.1, 0.02).toFixed(3)} ${h})`,
			[`${colorName}-100`]: `oklch(${(100 - gap * 0.1).toFixed(1)}% ${Math.min(c * 0.2, 0.04).toFixed(3)} ${h})`,
			[`${colorName}-200`]: `oklch(${(100 - gap * 0.2).toFixed(1)}% ${Math.min(c * 0.4, 0.08).toFixed(3)} ${h})`,
			[`${colorName}-300`]: `oklch(${(100 - gap * 0.4).toFixed(1)}% ${(c * 0.65).toFixed(3)} ${h})`,
			[`${colorName}-400`]: `oklch(${(100 - gap * 0.6).toFixed(1)}% ${(c * 0.85).toFixed(3)} ${h})`,
			[`${colorName}-500`]: `oklch(${L.toFixed(1)}% ${c.toFixed(3)} ${h})`,
			[`${colorName}-600`]: `oklch(${(L * 0.85).toFixed(1)}% ${(c * 1.02).toFixed(3)} ${h})`,
			[`${colorName}-700`]: `oklch(${(L * 0.72).toFixed(1)}% ${(c * 1.05).toFixed(3)} ${h})`,
			[`${colorName}-800`]: `oklch(${(L * 0.55).toFixed(1)}% ${c.toFixed(3)} ${h})`,
			[`${colorName}-900`]: `oklch(${(L * 0.40).toFixed(1)}% ${(c * 0.95).toFixed(3)} ${h})`,
			[`${colorName}-950`]: `oklch(14.5% ${(c * 0.85).toFixed(3)} ${h})`,
			[`${colorName}`]: `oklch(${L.toFixed(1)}% ${c.toFixed(3)} ${h})`,
		};
		
		PeakUi._colorScaleCache.set(cacheKey, result);
		return result;
	}

	_safeKey(key) {
		if (!key || typeof key !== 'string') return false;
		const forbidden = new Set(['__proto__', 'constructor', 'prototype', 'toString', 'valueOf', 'hasOwnProperty']);
		return !forbidden.has(key) && !key.startsWith('__');
	}

	_sanitizeCSSValue(val) {
		if (typeof val !== 'string') return '';
		
		if (!/^[\w\s\-%()#.,/]+$/.test(val)) return '';
		
		const dangerPatterns = [
			/expression\s*\(/gi,
			/javascript\s*:/gi,
			/url\s*\(\s*['"]?\s*data:/gi,
			/<\s*\/?\s*(script|style|iframe|object|embed)/gi,
			/\\[0-9a-f]{2,}/gi,
			/&{[^}]*}/g
		];
		
		for (const pattern of dangerPatterns) {
			pattern.lastIndex = 0;
			if (pattern.test(val)) return '';
		}
		
		return val;
	}

	_escapeSelector(selector) {
		if (typeof CSS !== 'undefined' && CSS.escape) {
			return CSS.escape(selector);
		}
		return selector.replace(/([:#[\]/.*+~>\s,=])/g, '\\$1');
	}

	_cleanColor(val) {
		if (!val) return 'transparent';
		if (!this._safeKey(val)) return 'transparent';
		if (Object.prototype.hasOwnProperty.call(this.colors, val)) return this.colors[val];
		if (this._colorHexRe.test(val)) return this._sanitizeCSSValue(val);
		return 'transparent';
	}


	injectBaseStyles() {
		if (document.getElementById('peakui-base')) return;
		const style = document.createElement('style');
		style.id = 'peakui-base';

		style.textContent = [
			`html:not(.peak-ready) body { opacity: 0; transition: none; }`,
			`*, *::before, *::after { box-sizing: border-box; border: 0 solid currentColor; }`,
			`html { line-height: 1.5; -webkit-text-size-adjust: 100%; font-family: system-ui, -apple-system, sans-serif; -webkit-tap-highlight-color: transparent; }`,
			`body { margin: 0; min-height: 100dvh; text-rendering: optimizeSpeed; -webkit-font-smoothing: antialiased; color-scheme: light dark; }`,
			`img, picture, video, canvas, svg { display: block; max-width: 100%; height: auto; }`,
			`input, button, textarea, select { font: inherit; background: transparent; color: inherit; margin: 0; padding: 0; }`,
			`button { cursor: pointer; text-transform: none; }`,
			`textarea { resize: vertical; }`,
			`::placeholder { opacity: 1; color: color-mix(in oklab, currentcolor 50%, transparent); }`,
			`ol, ul { list-style: none; margin: 0; padding: 0; }`,
			`a { color: inherit; text-decoration: inherit; }`,
			`h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; margin: 0; }`,
			`p { margin: 0; overflow-wrap: break-word; }`,
			`table { border-collapse: collapse; text-indent: 0; border-color: inherit; }`,
			`.row > * { flex-shrink: 0; width: 100%; max-width: 100%; padding: 0 0.75rem; margin-top: 0.5rem; }`,
			`[hidden] { display: none !important; }`,
			`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`,
			`@keyframes ping { 0% { transform: scale(1); opacity: 1; } 75%, 100% { transform: scale(2); opacity: 0; } }`,
			`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`,
			`@keyframes bounce { 0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); } 50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); } }`,
			`@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }`
		].join('');
		document.head.appendChild(style);
	}

	initDarkMode() {
		let saved = null;
		/* eslint-disable no-unused-vars */
		try { 
			saved = localStorage.getItem('theme');
			if (saved !== 'dark' && saved !== 'light') saved = null;
		} catch {
			// ignore
		}
		/* eslint-enable no-unused-vars */

		const html = document.documentElement;
		if (saved === 'dark') {
			html.classList.add('dark');
		} else if (saved === 'light') {
			html.classList.remove('dark');
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			html.classList.add('dark');
		}
	}

	initPrefixed() {
		this._sortedPrefixes = Object.keys(this.prefixMap)
			.sort((a, b) => b.length - a.length);
	}

	_trimCache() {
		if (this._processedClasses.size > PeakUi._maxCacheSize) {
			const toDelete = Array.from(this._processedClasses).slice(0, 1000);
			toDelete.forEach(key => {
				this._processedClasses.delete(key);
				this._generatedCSS.delete(key);
			});
		}
	}

	scanCss(context = document) {
		const newClasses = [];
		let count = 0;
		const maxElements = 10000;
		
		const elements = context.querySelectorAll('[class]');
		
		for (const el of elements) {
			if (count++ > maxElements) break;
			
			el.classList.forEach(cls => {
				const trimmedCls = cls.trim();
				if (!trimmedCls) return;
				if (this._processedClasses.has(trimmedCls)) return;
				
				this._processedClasses.add(trimmedCls);
				const parts = trimmedCls.split(':');
				const utility = parts.pop();
				if (!utility) return;
				
				const modifiers = parts;
				const breakpoint = modifiers.find(m => this._breakPointSet.has(m)) || null;
				const activeStates = modifiers.filter(m => this._stateSet.has(m));
				
				newClasses.push({
					raw: trimmedCls,
					utility,
					modifiers,
					breakpoint,
					states: activeStates,
					selector: this._escapeSelector(trimmedCls)
				});
			});
		}
		
		this._pendingClasses.push(...newClasses);
		this._trimCache();
	}

	startObserver() {
		let debounceTimer;

		this.observer = new MutationObserver((mutations) => {
			if (this.isInitialLoad) return;
			clearTimeout(debounceTimer);

			debounceTimer = setTimeout(() => {
				let hasNew = false;

				const processClass = (cls) => {
					if (!cls || !cls.trim()) return;
					if (this._processedClasses.has(cls)) return;
					hasNew = true;
					const trimmedCls = cls.trim();
					const parts = trimmedCls.split(':');
					const utility = parts.pop();
					if (!utility) return;
					const modifiers = parts;
					const breakpoint = modifiers.find(m => this._breakPointSet.has(m)) || null;
					const activeStates = modifiers.filter(m => this._stateSet.has(m));
					this._processedClasses.add(trimmedCls);
					this._pendingClasses.push({
						raw: trimmedCls, utility, modifiers, breakpoint,
						states: activeStates,
						selector: this._escapeSelector(trimmedCls)
					});
				};

				for (const mutation of mutations) {
					if (mutation.type === 'childList') {
						mutation.addedNodes.forEach(node => {
							if (node.nodeType === 1) {
								node.classList?.forEach(processClass);
								node.querySelectorAll?.('[class]').forEach(el => {
									el.classList?.forEach(processClass);
								});
							}
						});
					} else if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
						mutation.target.classList?.forEach(processClass);
					}
				}

				if (hasNew && this._pendingClasses.length > 0) {
					if (this.debug) console.time('PeakUI-Update');
					this.renderStylesIncremental();
					if (this.debug) console.timeEnd('PeakUI-Update');
				}
			}, 50);
		});

		this.observer.observe(document.body, {
			childList: true, subtree: true,
			attributes: true, attributeFilter: ['class']
		});
	}

	renderStylesIncremental() {
		if (this._pendingClasses.length === 0) return;

		const sizePrefixes = new Set(['w','h','min-w','max-w','min-h','max-h','min-inline','max-inline','min-block','max-block','basis','flex','columns','inline','inline-block']);
		const spacingPrefixes = new Set([...sizePrefixes, 'p','pt','pb','pl','pr','px','py','ps','m','mt','mb','ml','mr','mx','my','ms','gap','gap-x','gap-y','inset','top','right','bottom','left']);
		const borderWidthProps = new Set(['border-width','border-top-width','border-right-width','border-bottom-width','border-left-width','border-inline-width','border-block-width']);

		const isValid = (v) => this._validValueRe.test(v);
		
		const newStyles = [];

		for (const item of this._pendingClasses) {
			if (!item || typeof item !== 'object' || !item.utility) continue;

			if (this._generatedCSS.has(item.raw)) {
				const cached = this._generatedCSS.get(item.raw);
				if (cached) {
					newStyles.push(cached);
				}
				continue;
			}

			const { utility, breakpoint, states, selector, modifiers } = item;
			const hasDark = modifiers && modifiers.includes('dark');
			const pseudoStates = states.filter(s => s !== 'dark').map(s => this.states[s]).join('');
			let styleBody = '';

			if (this.rules[utility]) {
				styleBody = this.rules[utility];
			} else if (utility.startsWith('space-x-') || utility.startsWith('space-y-')) {
				const spaceParts = utility.split('-');
				const axis = spaceParts[1];
				const valPart = spaceParts[2];
				const direction = axis === 'x' ? 'inline' : 'block';
				let val = this.spacing[valPart] || (valPart.startsWith('[') ? valPart.slice(1, -1) : valPart);
				if (!isNaN(valPart) && !this.spacing[valPart]) val = (parseFloat(valPart) * 0.25) + 'rem';
				styleBody = `:where(& > :not(:last-child)) { --peak-space-${axis}-reverse: 0; margin-${direction}-end: calc(${val} * calc(1 - var(--peak-space-${axis}-reverse))); margin-${direction}-start: calc(${val} * var(--peak-space-${axis}-reverse)); }`;

			} else if (utility.includes('/')) {
				const [baseClass, opacityStr] = utility.split('/');
				let alpha = opacityStr.includes('.') ? parseFloat(opacityStr) : parseInt(opacityStr, 10) / 100;
				alpha = Math.min(1, Math.max(0, alpha));
				const bParts = baseClass.split('-');
				let property = null, colorValue = null;
				for (let i = bParts.length - 1; i > 0; i--) {
					const testPrefix = bParts.slice(0, i).join('-');
					const testProp = this.prefixMap[testPrefix] || null;
					if (testProp) {
						const colorKey = bParts.slice(i).join('-');
						colorValue = this.colors[colorKey];
						property = testProp;
						break;
					}
				}
				if (property && colorValue) {
					const withAlpha = colorValue.startsWith('oklch(') && colorValue.endsWith(')')
						? colorValue.replace(/\)$/, ` / ${alpha})`) : colorValue;
					styleBody = Array.isArray(property)
						? property.map(p => `${p}: ${withAlpha}`).join('; ')
						: `${property}: ${withAlpha}`;
				}

			} else {
				const parts = utility.split('-');
				let prefix = '', value = '', property = null;

				for (let i = parts.length - 1; i > 0; i--) {
					const testPrefix = parts.slice(0, i).join('-');
					const testProp = this.prefixMap[testPrefix] || null;
					if (testProp) { prefix = testPrefix; value = parts.slice(i).join('-'); property = testProp; break; }
				}

				let cssValue = (this.colors[value] || value).replace(/[[\]]/g, '');
				cssValue = this.colors[cssValue] || cssValue;
				cssValue = this._sanitizeCSSValue(cssValue);

				if (sizePrefixes.has(prefix)) {
					cssValue = this.sizes[cssValue] || (isValid(cssValue) ? cssValue : null);
				}

				if (prefix === 'text' && this._numericRe.test(cssValue)) {
					property = 'font-size';
					cssValue = cssValue + 'px';
				} else if (prefix === 'text' && (cssValue.includes('px') || cssValue.includes('rem') || cssValue.includes('em'))) {
					property = 'font-size';
				}

				if (prefix === 'rounded') {
					cssValue = this.spacing[cssValue] || cssValue;
					cssValue = this.roundedSizes[cssValue] || cssValue;
				}

				if (spacingPrefixes.has(prefix)) {
					cssValue = this.spacing[cssValue] || cssValue;
					cssValue = this.sizes[cssValue] || cssValue;
				}

				if (prefix === 'border' || prefix.startsWith('border-')) {
					cssValue = this.borderSizes[cssValue] || cssValue;
				}

				const isColorValue = cssValue && typeof cssValue === 'string' && (
					cssValue.startsWith('oklch') || cssValue.startsWith('#') ||
					cssValue.startsWith('rgb') || cssValue === 'transparent' ||
					cssValue === 'currentColor' || cssValue === 'inherit'
				);

				if (prefix === 'outline') {
					if (cssValue.includes('px') || cssValue.includes('rem') || cssValue.includes('em')) {
						property = 'outline-style: solid; outline-width';
					} else if (this.spacing[cssValue] || this.roundedSizes[cssValue]) {
						cssValue = this.spacing[cssValue] || this.roundedSizes[cssValue];
						property = 'outline-style: solid; outline-width';
					}
				}

				if (isColorValue && property && !Array.isArray(property) && borderWidthProps.has(property)) {
					property = property.replace('-width', '-color');
				}

				if (!styleBody && utility.startsWith('grid-cols-')) {
					const num = parseInt(utility.slice(10), 10);
					if (num > 0) styleBody = `grid-template-columns: repeat(${num}, minmax(0, 1fr));`;
				}
				if (!styleBody && utility.startsWith('col-span-')) {
					const num = parseInt(utility.slice(9), 10);
					if (num > 0) styleBody = `grid-column: span ${num} / span ${num};`;
				}
				if (!styleBody && utility.startsWith('row-span-')) {
					const num = parseInt(utility.slice(9), 10);
					if (num > 0) styleBody = `grid-row: span ${num} / span ${num};`;
				}

				if (!styleBody && property && cssValue) {
					styleBody = Array.isArray(property)
						? property.map(p => `${p}: ${cssValue}`).join('; ')
						: `${property}: ${cssValue}`;
				}
			}

			if (!styleBody) {
				const cssComponents = this.Components(utility, modifiers);
				if (cssComponents) {
					this._generatedCSS.set(item.raw, cssComponents);
					newStyles.push(cssComponents);
				} else {
					this._generatedCSS.set(item.raw, null);
				}
				continue;
			}

			if (!styleBody.trim().endsWith(';')) styleBody += ';';

			if (this._criticalUtils.has(utility)) {
				styleBody.replace(/;/g, ' !important;');
			}
			// styleBody = styleBody.replace(/;/g, ' !important;');
			
			let rule;
			const mediaQuery = breakpoint ? this.breakPoints[breakpoint] : null;
			const selectorStr = `.${selector}${pseudoStates}`;

			if (hasDark) {
				const darkSelector = `.dark .${selector}${pseudoStates}, .dark${pseudoStates} .${selector}`;
				if (mediaQuery) {
					rule = `@media (min-width: ${mediaQuery}) { ${darkSelector} { ${styleBody} } }\n`;
				} else {
					rule = `${darkSelector} { ${styleBody} }\n`;
				}
			} else {
				if (mediaQuery) {
					rule = `@media (min-width: ${mediaQuery}) { ${selectorStr} { ${styleBody} } }\n`;
				} else {
					rule = `${selectorStr} { ${styleBody} }\n`;
				}
			}

			this._generatedCSS.set(item.raw, rule);
			newStyles.push(rule);
		}

		if (newStyles.length > 0) {
			const styleId = 'peak-ui-jit';
			let styleTag = document.getElementById(styleId);
			if (!styleTag) {
				styleTag = document.createElement('style');
				styleTag.id = styleId;
				document.head.appendChild(styleTag);
			}
			
			// styleTag.textContent += '\n' + newStyles.join('\n').replace(/\s*\{\s*/g, '{').replace(/\s*\}\s*/g, '}').replace(/\s*;\s*/g, ';').replace(/\n+/g, ' ').replace(/\s{2,}/g, ' ').trim();
			// styleTag.textContent += '\n' + newStyles.join('\n');
			let buffer = '';
			for (const rule of newStyles) buffer += rule;
			styleTag.textContent += buffer;
			
			if (this.debug) {
				console.log('Added', newStyles.length, 'new rules, total size:', (styleTag.textContent.length / 1024).toFixed(2) + ' KB');
			}
		}

		this._pendingClasses = [];
	}

	_initComponentMaps() {
		
		this._filterKeys = {
			'blur': 'blur',
			'brightness': 'brightness',
			'contrast': 'contrast',
			'grayscale': 'grayscale',
			'hue-rotate': 'hue-rotate',
			'invert': 'invert',
			'opacity': 'opacity',
			'saturate': 'saturate',
			'sepia': 'sepia',
			'backdrop-blur': 'blur',
			'backdrop-brightness': 'brightness',
			'backdrop-contrast': 'contrast',
			'backdrop-grayscale': 'grayscale',
			'backdrop-hue-rotate': 'hue-rotate',
			'backdrop-invert': 'invert',
			'backdrop-opacity': 'opacity',
			'backdrop-saturate': 'saturate',
			'backdrop-sepia': 'sepia'
		};
	}

	Components(utility, modifiers) {
		
		const parts = utility.split('-');
		let prefix = '';
		let value = '';
		let styleBody = '';
		
		const hasBreakpoint = modifiers && Array.isArray(modifiers) && modifiers.some(m => this._breakPointSet.has(m));
		const modifier = hasBreakpoint ? modifiers.find(m => this._breakPointSet.has(m)) + '\\:' : '';

		const safeUtility = this._escapeSelector(utility);

		for (let i = parts.length - 1; i > 0; i--) {
			const testPrefix = parts.slice(0, i).join('-');
			if (!this._safeKey(testPrefix)) continue;
			if (Object.prototype.hasOwnProperty.call(this._filterKeys, testPrefix)) {
				value = parts.slice(i).join('-');
				if (!value) break;
				
				let finalValue = value;
				const filterType = this._filterKeys[testPrefix];
				
				if (testPrefix === 'blur' || testPrefix === 'backdrop-blur') {
					if (!value.includes('px') && !isNaN(value)) finalValue = value + 'px';
				} else if (testPrefix === 'hue-rotate' || testPrefix === 'backdrop-hue-rotate') {
					if (!value.includes('deg') && !isNaN(value)) finalValue = value + 'deg';
				} else {
					if (!value.includes('%') && !value.includes('px') && !value.includes('deg') && !isNaN(value)) {
						finalValue = value + '%';
					}
				}
				
				const isBackdrop = testPrefix.startsWith('backdrop-');
				const property = isBackdrop ? 'backdrop-filter' : 'filter';
				styleBody = `.${modifier}${utility} { ${property}: ${filterType}(${finalValue}); }`;
				break;
			}
		}

		if (!styleBody) {
			for (let i = parts.length; i > 0; i--) {
				const testPrefix = parts.slice(0, i).join('-');
				if (!this._safeKey(testPrefix)) continue;
				if (window.PeakUIExtraComponents && window.PeakUIExtraComponents[testPrefix]) {
					prefix = testPrefix;
					value = parts.slice(i).join('-');
					if (value && !this._safeKey(value)) { prefix = ''; value = ''; }
					break;
				}
			}

			if (!prefix && window.PeakUIExtraComponents && window.PeakUIExtraComponents[utility]) {
				prefix = utility;
				value = '';
			}
		}
		
		if (window.PeakUIExtraComponents && window.PeakUIExtraComponents[prefix]) {
			return window.PeakUIExtraComponents[prefix](utility, value, modifier, safeUtility, this);
		}
			


		return styleBody;
	}

	destroy() {
		this.disconnect();
		this._processedClasses.clear();
		this._generatedCSS.clear();
		this._pendingClasses = [];
		this._lastRenderCount = 0;
		document.documentElement.classList.remove('peak-ready');
		const styleTag = document.getElementById('peak-ui-jit');
		if (styleTag) styleTag.remove();
		if (this.debug) console.log('PeakUI destroyed');
	}

	main() {
		this.initPrefixed();
		this._initComponentMaps();
		this.scanCss();
		this.renderStylesIncremental();
		this.startObserver();
		requestAnimationFrame(() => {
			setTimeout(() => { this.isInitialLoad = false; }, 50);
		});
		document.documentElement.classList.add('peak-ready');
		if (this.debug) {
			console.timeEnd('PeakUI-JS-Time');
			
			setTimeout(() => {
				const totalTime = performance.now() - this._startTime;
				console.log('🔥 (JS + CSS + Render):', totalTime.toFixed(2), 'ms');
			}, 0);
		}

	}
}

let peakInstance = null;


window.addEventListener('DOMContentLoaded', () => {
	try {
		if (!peakInstance) {
			peakInstance = new PeakUi();
			peakInstance.main();
		}

		Object.defineProperty(window, 'peak', {
			value: peakInstance,
			writable: false,
			configurable: false,
			enumerable: false
		});
	} catch (err) {
		console.error('PeakUi could not be started:', err);
	}
});