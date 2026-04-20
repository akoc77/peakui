// peakui_extra.js
window.PeakUIExtraRules = {
	'test': 'color: #ff0000'
};

window.PeakUIExtraPrefix = {
	'test': 'color'
};

window.PeakUIExtraColors = {
	'main': function(peak) {
		const colors = {
			...peak._colorScale('mauve', 0.542, 0.034, 322.5),
			...peak._colorScale('stone', 0.538, 0.038, 56.8),
			...peak._colorScale('neutral', 0.545, 0.000, 0),
			...peak._colorScale('warmGray', 0.542, 0.045, 45.2),
			...peak._colorScale('coolGray', 0.551, 0.040, 248.3),
			...peak._colorScale('blueGray', 0.548, 0.048, 245.5)
		}
		
		return colors;
	}
};

window.addEventListener('DOMContentLoaded', window.initPeakUIExtraColors);

window.PeakUIExtraComponents = {
	'btn': function(utility, value, modifier, safeUtility, peak) {
		const baseColor = peak._cleanColor(value);
		const hoverColor = value && peak.colors[value] ? peak._cleanColor(`${value}-700`) : baseColor;
		const activeColor = value && peak.colors[value] ? peak._cleanColor(`${value}-800`) : baseColor;
		const textColor = value && peak.colors[`${value}-50`] ? 'oklch(0.98 0.02 25.5)' : 'oklch(15% 0 0)';	
		styleBody = [
			`.${modifier}${safeUtility} { display: inline-flex; align-items: center; justify-content: center; padding: 0.65em 1.2em; font: 600 15px "Segoe UI", Helvetica, Arial, sans-serif; color: ${textColor}; background-color: ${baseColor}; border: 1px solid ${activeColor}; border-radius: 6px; cursor: pointer; text-decoration: none; box-shadow: 0 1px 3px rgba(0,0,0,0.40); }`,
			`.${modifier}${safeUtility}:hover { background-color: ${hoverColor}; box-shadow: 0 2px 6px rgba(0,0,0,0.55); }`,
			`.${modifier}${safeUtility}:active { background-color: ${activeColor}; box-shadow: inset 0 2px 4px rgba(0,0,0,0.40); }`,
			`.${modifier}${safeUtility}:disabled { opacity: 0.6; cursor: not-allowed; filter: grayscale(0.5); pointer-events: none; }`].join('');
		return styleBody;
	},
	
	'switch': function(utility, value, modifier, safeUtility, peak) {
		const themeColor = value && peak.colors[value] ? peak.colors[value] : 'oklch(60% 0.15 250)';
		styleBody = [
			`.${modifier}${safeUtility} { position: relative; display: inline-flex; align-items: center; cursor: pointer; user-select: none; gap: 0.75rem; }`,
			`.${modifier}${safeUtility} input { position: absolute; opacity: 0; width: 0; height: 0; }`,
			`.${modifier}${safeUtility} .slider { position: relative; width: 2.75rem; height: 1.5rem; background-color: oklch(90% 0 0); border-radius: 2rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }`,
			`.${modifier}${safeUtility} .slider::before { content: ""; position: absolute; height: 1.125rem; width: 1.125rem; left: 0.1875rem; bottom: 0.1875rem; background-color: #ffffff; border-radius: 50%; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 2px 4px rgba(0,0,0,0.1); }`,
			`.${modifier}${safeUtility} input:checked + .slider { background-color: ${themeColor}; }`,
			`.${modifier}${safeUtility} input:checked + .slider::before { transform: translateX(1.25rem); }`,
			`.${modifier}${safeUtility} input:focus-visible + .slider { outline: 2px solid ${themeColor}; outline-offset: 2px; }`].join('');
		return styleBody;
	},
	
	'card': function(utility, value, modifier, safeUtility, peak) {
		const accentColor = value && peak.colors[value] ? peak.colors[value] : 'oklch(0% 0 0)';
		const lightBg = value && peak.colors[value] ? peak.colors[`${value}-50`] : 'oklch(98% 0 0)';
		const titleColor = value && peak.colors[value] ? peak.colors[`${value}-700`] : 'oklch(25% 0 0)';
		const textColor = value && peak.colors[value] ? peak.colors[`${value}-600`] : 'oklch(45% 0 0)';
		const borderColor = value && peak.colors[value] ? peak.colors[`${value}-200`] : 'oklch(92% 0 0)';

		styleBody = [
			`.${modifier}${safeUtility} { position: relative; display: flex; flex-direction: column; background: oklch(100% 0 0); border-radius: 0.50rem;  overflow: hidden; border: 1px solid ${borderColor}; }`,
			`.${modifier}${safeUtility}.card-shadow { box-shadow: color-mix(in oklab, ${accentColor} 20%, transparent) 0px 1px 2px 0px, color-mix(in oklab, ${accentColor} 20%, transparent) 0px 1px 3px; }`,
			`.${modifier}${safeUtility} .image { width: 100%; display: block; }`,
			`.${modifier}${safeUtility} .image img { width: 100%; height: auto; display: block; object-fit: cover; }`,
			`.${modifier}${safeUtility} .content { padding: 1rem; border-top: none; flex: 1; }`,
			`.${modifier}${safeUtility} .header { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.25rem; color: ${titleColor}; display: block; }`,
			`.${modifier}${safeUtility} .meta { color: ${textColor}; font-size: 0.75rem; margin-bottom: 0.5rem; }`,
			`.${modifier}${safeUtility} .description { color: ${textColor}; font-size: 0.875rem; line-height: 1.5; }`,
			`.${modifier}${safeUtility} .extra { border-top: 1px solid ${borderColor}; padding: 0.75rem 1rem; background: ${lightBg}; color: ${textColor}; font-size: 0.75rem; display: flex; align-items: center; gap: 0.5rem; }`,
			`.${modifier}${safeUtility} .right.floated { margin-left: auto; }`,
			`.${modifier}${safeUtility} .avatar { width: 2rem; height: 2rem; border-radius: 9999px; object-fit: cover; margin-right: 0.5rem; }`,
			`.${modifier}${safeUtility} .input { display: flex; align-items: center; gap: 0.5rem; width: 100%; }`,
			`.${modifier}${safeUtility} .input input { flex: 1; border: none; background: transparent; padding: 0.5rem 0; font-size: 0.875rem; outline: none; }`,
			`.${modifier}${safeUtility} .input input::placeholder { color: oklch(65% 0 0); }`,
			`.${modifier}${safeUtility} .icon { cursor: pointer; color: oklch(65% 0 0); transition: color 0.2s; }`,
			`.${modifier}${safeUtility} .icon:hover { color: ${accentColor}; }`,
			`.dark .${modifier}${safeUtility} { background: oklch(18% 0 0); border-color: oklch(25% 0 0); box-shadow: 0 4px 12px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2); }`,
			`.dark .${modifier}${safeUtility} .header { color: oklch(90% 0 0); }`,
			`.dark .${modifier}${safeUtility} .meta { color: oklch(65% 0 0); }`,
			`.dark .${modifier}${safeUtility} .description { color: oklch(70% 0 0); }`,
			`.dark .${modifier}${safeUtility} .extra { border-top-color: oklch(22% 0 0); background: oklch(14% 0 0); color: oklch(60% 0 0); }`,
			`.dark .${modifier}${safeUtility} .input input { color: oklch(90% 0 0); }`,
			`.dark .${modifier}${safeUtility} .input input::placeholder { color: oklch(45% 0 0); }`].join('');
		return styleBody;
	},
	
	'navbar': function(utility, value, modifier, safeUtility, peak) {
		const themeColor = value && peak.colors[value] ? peak.colors[value] : '#38bdf8';
		const bgColor = value && peak.colors[value] ? peak.colors[`${value}-800`] : '#0f172a';
		const dropdownBg = value && peak.colors[value] ? peak.colors[`${value}-700`] : '#1e293b';
		const textColor = '#f8fafc';
		const hoverBg = 'rgba(255,255,255,0.1)';
		
		styleBody = [
			`.${modifier}${safeUtility} { background-color: ${bgColor}; position: relative; z-index: 1000; width: 100%; }`,
			`.${modifier}${safeUtility} .nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; }`,
			`.${modifier}${safeUtility} .nav-logo { color: ${textColor}; font-size: 24px; font-weight: 800; text-decoration: none; letter-spacing: -0.5px; }`,
			`.${modifier}${safeUtility} .nav-list { display: flex; list-style: none; margin: 0; padding: 0; gap: 8px; }`,
			`.${modifier}${safeUtility} .nav-list li { position: relative; list-style: none; }`,
			`.${modifier}${safeUtility} .nav-item { color: ${textColor}; text-decoration: none; padding: 10px 16px; display: flex; align-items: center; border-radius: 6px; font-weight: 500; transition: all 0.2s; cursor: pointer; white-space: nowrap; background: none; border: none; width: 100%; }`,
			`.${modifier}${safeUtility} .nav-item:hover { background-color: ${hoverBg}; }`,
			`.${modifier}${safeUtility} .arrow { font-size: 10px; margin-left: 8px; transition: transform 0.3s ease; opacity: 0.7; display: inline-block; }`,
			`.${modifier}${safeUtility} .is-open > .nav-item .arrow { transform: rotate(180deg); color: ${themeColor}; }`,
			`.${modifier}${safeUtility} .dropdown-menu { display: none; position: absolute; top: 100%; left: 0; background-color: ${dropdownBg}; min-width: 200px; padding: 8px 0; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4); list-style: none; z-index: 1001; }`,
			`.${modifier}${safeUtility} .dropdown-menu .dropdown-menu { top: -8px; left: 100%; margin-left: 5px; display: none; opacity: 1 !important; visibility: visible !important; transform: none !important; }`,
			`.${modifier}${safeUtility} .dropdown-menu .is-open > .dropdown-menu { display: block !important; }`,
			`.${modifier}${safeUtility} .dropdown-menu .nav-item { padding: 10px 16px; white-space: nowrap; }`,
			`.${modifier}${safeUtility} .is-open > .dropdown-menu { display: block; }`,
			`.${modifier}${safeUtility} .dropdown-menu .dropdown-trigger .arrow { transform: rotate(90deg); }`,
			`.${modifier}${safeUtility} .dropdown-menu .is-open > .dropdown-trigger .arrow { transform: rotate(90deg); }`,
			`.${modifier}${safeUtility} .burger-btn { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 5px; }`,
			`.${modifier}${safeUtility} .burger-btn span { width: 24px; height: 2px; background-color: ${textColor}; border-radius: 4px; transition: all 0.3s; }`,
			`@media (max-width: 768px) {`,
			`.${modifier}${safeUtility} .burger-btn { display: flex; }`,
			`.${modifier}${safeUtility} .nav-list { display: none; position: absolute; top: 100%; left: 0; width: 100%; background-color: ${bgColor}; flex-direction: column; padding: 10px 0; border-top: 1px solid rgba(255,255,255,0.1); max-height: 80vh; overflow-y: auto; }`,
			`.${modifier}${safeUtility} .nav-list.is-active { display: flex; }`,
			`.${modifier}${safeUtility} .dropdown-menu { position: static !important; width: 100% !important; background-color: rgba(0,0,0,0.2); box-shadow: none; border-radius: 0; padding: 0 0 0 5px; display: none; }`,
			`.${modifier}${safeUtility} .dropdown-menu .dropdown-menu { position: static !important; width: 100% !important; left: auto !important; top: auto !important; margin-left: -5px !important; border: none !important; background-color: rgba(0,0,0,0.15) !important; }`,
			`.${modifier}${safeUtility} .is-open > .dropdown-menu { display: block !important; }`,
			`.${modifier}${safeUtility} .nav-item { padding: 14px 20px; justify-content: space-between; width: 100%; box-sizing: border-box; }`,
			`.${modifier}${safeUtility} .dropdown-menu .nav-item { padding-left: 40px; }`,
			`.${modifier}${safeUtility} .dropdown-menu .dropdown-menu .nav-item { padding-left: 60px; }`,
			`.${modifier}${safeUtility} .dropdown-menu .dropdown-trigger .arrow { transform: rotate(90deg); }`,
			`.${modifier}${safeUtility} .dropdown-menu .is-open > .dropdown-trigger .arrow { transform: rotate(270deg); }}`,
			`.dark .${modifier}${safeUtility} { background-color: #0a0a0a; }`,
			`.dark .${modifier}${safeUtility} .dropdown-menu { background-color: #1a1a1a; }`,
			`@media (max-width: 768px) {`,
			`.dark .${modifier}${safeUtility} .dropdown-menu { background-color: rgba(255,255,255,0.05); }}`].join('');
			
		if (!window.__peakui_navbar_done) {
			window.__peakui_navbar_done = true;
			
			const s = n => {
				const b = n.querySelector('.burger-btn'), m = n.querySelector('.nav-list');
				if (b && m && !n._burgerBound) { n._burgerBound = 1; b.addEventListener('click', e => { e.stopPropagation(); m.classList.toggle('is-active'); }); }
				const t = () => { n.querySelectorAll('.dropdown-trigger').forEach(d => { if (d._bound) return; d._bound = 1; d.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); const p = d.closest('li'); if (!p) return; const pa = p.parentElement; if (pa) { pa.querySelectorAll(':scope > li').forEach(l => { if (l !== p && l.classList.contains('is-open')) l.classList.remove('is-open'); }); } p.classList.toggle('is-open'); }); }); };
				t(); new MutationObserver(() => t()).observe(n, { childList: !0, subtree: !0 });
				const c = e => { if (!n.contains(e.target)) { n.querySelectorAll('.is-open').forEach(o => o.classList.remove('is-open')); if (m) m.classList.remove('is-active'); } };
				document.removeEventListener('click', n._closeHandler); n._closeHandler = c; document.addEventListener('click', n._closeHandler);
				const r = () => { if (window.innerWidth > 768 && m) m.classList.remove('is-active'); };
				window.removeEventListener('resize', n._resizeHandler); n._resizeHandler = r; window.addEventListener('resize', n._resizeHandler);
			};
			
			document.querySelectorAll('[class*="navbar-"]').forEach(s);
			if (this.observer) new MutationObserver(e => e.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 1) { if (n.classList?.some(c => c.includes('navbar'))) s(n); n.querySelectorAll?.('[class*="navbar-"]').forEach(s); } }))).observe(document.body, { childList: !0, subtree: !0 });
		}
		
		return styleBody;
	},
	
	'dropdown': function(utility, value, modifier, safeUtility, peak) {
		value = value ?? 'blue';
		const defaultHue = 250;
		const defaultSaturation = 0.15;
		
		const themeColor = value && peak.colors[value] ? peak.colors[value] : `oklch(60% ${defaultSaturation} ${defaultHue})`;
		const themeLight = value && peak.colors[`${value}-100`] ? peak.colors[`${value}-100`] : `oklch(94% ${defaultSaturation * 0.6} ${defaultHue})`;
		const themeHover = value && peak.colors[`${value}-400`] ? peak.colors[`${value}-400`] : `oklch(85% ${defaultSaturation} ${defaultHue})`;
		const borderColor = value && peak.colors[`${value}-300`] ? peak.colors[`${value}-300`] : `oklch(88% ${defaultSaturation * 0.3} ${defaultHue})`;
		const bgColor = value && peak.colors[`${value}-50`] ? peak.colors[`${value}-50`] : `oklch(98% ${defaultSaturation * 0.1} ${defaultHue})`; // DÜZELTİLDİ
		const textColor = value && peak.colors[`${value}-900`] ? peak.colors[`${value}-900`] : `oklch(20% ${defaultSaturation} ${defaultHue})`; // DÜZELTİLDİ
		const hoverBg = value && peak.colors[`${value}-200`] ? peak.colors[`${value}-200`] : `oklch(94% ${defaultSaturation * 0.6} ${defaultHue})`; // DÜZELTİLDİ
		const hoverTextColor = value && peak.colors[`${value}-800`] ? peak.colors[`${value}-800`] : `oklch(25% ${defaultSaturation} ${defaultHue})`; // DÜZELTİLDİ

		styleBody = [
			`.${modifier}${safeUtility} { position: relative; display: inline-block; }`,
			`.${modifier}${safeUtility} .dd-toggle { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1rem; background: ${themeColor}; border: 1px solid ${borderColor}; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 500; color: ${textColor}; cursor: pointer; transition: all 0.2s; }`,
			`.${modifier}${safeUtility} .dd-toggle:hover { background: ${hoverBg}; border-color: ${themeColor}; color: ${hoverTextColor}; }`,
			`.${modifier}${safeUtility} .dd-toggle::after { content: "▼"; font-size: 0.65rem; transition: transform 0.2s; }`,
			`.${modifier}${safeUtility} .dd-menu { position: absolute; top: 100%; left: 0; margin-top: 0.25rem; min-width: 12rem; background: ${bgColor}; border: 1px solid ${borderColor}; border-radius: 0.5rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); opacity: 0; visibility: hidden; transform: translateY(-8px); transition: all 0.2s; z-index: 50; }`,
			`.${modifier}${safeUtility} .dd-menu.right { left: auto; right: 0; }`,
			`.${modifier}${safeUtility} .dd-item { display: block; padding: 0.6rem 1rem; font-size: 0.875rem; color: ${textColor}; text-decoration: none; transition: all 0.15s; }`,
			`.${modifier}${safeUtility} .dd-item:hover { background: ${hoverBg}; color: ${hoverTextColor}; }`,
			`.${modifier}${safeUtility} .dd-divider { height: 1px; margin: 0.25rem 0; background: ${borderColor}; }`,
			`.${modifier}${safeUtility}.open .dd-menu { opacity: 1; visibility: visible; transform: translateY(0); }`,
			`.${modifier}${safeUtility}.open .dd-toggle::after { transform: rotate(180deg); }`,
			`.dark .${modifier}${safeUtility} .dd-toggle { background: oklch(18% 0 0); border-color: oklch(28% 0 0); color: oklch(85% 0 0); }`,
			`.dark .${modifier}${safeUtility} .dd-toggle:hover { background: ${themeLight}; border-color: ${themeColor}; color: ${themeColor}; }`,
			`.dark .${modifier}${safeUtility} .dd-menu { background: oklch(18% 0 0); border-color: oklch(28% 0 0); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3); }`,
			`.dark .${modifier}${safeUtility} .dd-item { color: oklch(80% 0 0); }`,
			`.dark .${modifier}${safeUtility} .dd-item:hover { background: ${themeLight}; color: ${themeColor}; }`,
			`.dark .${modifier}${safeUtility} .dd-divider { background: oklch(28% 0 0); }`
		].join('');

		if(!window.__peakui_dropdown_done){
			window.__peakui_dropdown_done=true;
			let c=null;
			const s=d=>{const t=d.querySelector('.dd-toggle');if(t)t.addEventListener('click',e=>{e.stopPropagation();if(c&&c!==d)c.classList.remove('open');d.classList.toggle('open');c=d.classList.contains('open')?d:null})};
			const q=a=>document.querySelectorAll(a);
			q('.dropdown,[class*="dropdown-"]').forEach(s);
			document.addEventListener('click',e=>{q('.dropdown.open,[class*="dropdown-"].open').forEach(d=>{if(!d.contains(e.target)){d.classList.remove('open');if(c===d)c=null}})});
			document.addEventListener('keydown',e=>{if(e.key==='Escape'){q('.dropdown.open,[class*="dropdown-"].open').forEach(d=>d.classList.remove('open'));c=null}});
			if(this.observer)new MutationObserver(m=>m.forEach(mu=>mu.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.classList?.contains('dropdown')||n.classList?.toString().includes('dropdown-'))s(n);n.querySelectorAll?.('.dropdown,[class*="dropdown-"]').forEach(s)}}))).observe(document.body,{childList:true,subtree:true})
		}
		
		return styleBody;
	},
	
	'accordion': function(utility, value, modifier, safeUtility, peak) {
		const themeColor = value && peak.colors[value] ? peak.colors[value] : 'oklch(60% 0.15 250)';
		const borderColor = 'oklch(94% 0 0)';

		styleBody = [
			`.${modifier}${safeUtility} { width: 100%; border-radius: 0.75rem; background: #fff; overflow: hidden; box-shadow: 0 10px 30px -5px rgba(0,0,0,0.06); border: 1px solid ${borderColor}; }`,
			`.${modifier}${safeUtility} .acc-item { border-bottom: 1px solid ${borderColor}; transition: background 0.2s; }`,
			`.${modifier}${safeUtility} .acc-item:last-child { border-bottom: none; }`,
			`.${modifier}${safeUtility} .acc-trigger { display: none; }`,
			`.${modifier}${safeUtility} .acc-header { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; font-weight: 600; cursor: pointer; transition: all 0.25s ease; color: oklch(35% 0 0); letter-spacing: -0.01em; }`,
			`.${modifier}${safeUtility} .acc-header:hover { color: ${themeColor}; background: oklch(99% 0 0); }`,
			`.${modifier}${safeUtility} .acc-header::after { content: "+"; font-size: 1.5rem; font-weight: 300; transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); color: oklch(75% 0 0); }`,
			`.${modifier}${safeUtility} .acc-content { max-height: 0; overflow: hidden; transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1); background: #fff; }`,
			`.${modifier}${safeUtility} .acc-inner { padding: 0 1.5rem 1.5rem; color: oklch(50% 0 0); font-size: 0.9375rem; line-height: 1.6; }`,
			`.${modifier}${safeUtility} .acc-trigger:checked ~ .acc-header { color: ${themeColor}; }`,
			`.${modifier}${safeUtility} .acc-trigger:checked ~ .acc-header::after { content: "−"; transform: rotate(180deg); color: ${themeColor}; }`,
			`.${modifier}${safeUtility} .acc-trigger:checked ~ .acc-content { max-height: 1000px; }`,
			`.dark .${modifier}${safeUtility} { background: oklch(18% 0 0); border-color: oklch(25% 0 0); box-shadow: 0 10px 30px -5px rgba(0,0,0,0.3); }`,
			`.dark .${modifier}${safeUtility} .acc-item { border-bottom-color: oklch(25% 0 0); }`,
			`.dark .${modifier}${safeUtility} .acc-header { color: oklch(85% 0 0); }`,
			`.dark .${modifier}${safeUtility} .acc-header:hover { color: ${themeColor}; background: oklch(22% 0 0); }`,
			`.dark .${modifier}${safeUtility} .acc-content { background: oklch(18% 0 0); }`,
			`.dark .${modifier}${safeUtility} .acc-inner { color: oklch(65% 0 0); }`].join('');
			
		return styleBody;
	},
	
	'alert': function(utility, value, modifier, safeUtility, peak) {
		const baseColor = peak._cleanColor(value);
		const textColor = value && peak.colors[value] ? peak._cleanColor(`${value}-50`) : '#000000';
		const borderColor = value && peak.colors[value] ? peak._cleanColor(`${value}-900`) : '#000000';		
		styleBody = [
			`.${modifier}${safeUtility} { padding: 1rem 1.25rem; margin-block: 0.75rem; border: 1.5px solid ${borderColor}; border-radius: 1rem; font-family: "Inter", "Segoe UI", system-ui, sans-serif; font-weight: 510; font-size: 0.9375rem; display: flex; align-items: center; gap: 0.75rem; background-color: ${baseColor}; color: ${textColor}; line-height: 1.5; }`].join('');

		return styleBody;
	},
	
	'badge': function(utility, value, modifier, safeUtility, peak) {
		const baseColor = peak._cleanColor(value);
		const textColor = value && peak.colors[value] ? 'oklch(100% 0 0)' : '#000000';		
		
		styleBody = [
			`.${modifier}${safeUtility} { display: inline-flex; align-items: center; padding: 0.5em 0.7em; font-size: 0.75rem; font-weight: 700; border-radius: .5rem; background-color: ${baseColor}; color: ${textColor}; line-height: 1; white-space: nowrap; }`].join('');
		return styleBody;
	},
	
	'input': function(utility, value, modifier, safeUtility, peak) {
		const baseColor = value && peak.colors[value] ? peak._cleanColor(value) : 'oklch(0% 0 0)';
		styleBody = [
			`.${modifier}${safeUtility} { display: block; width: 100%; padding: 0.75rem 1rem; font-size: 0.875rem; line-height: 1.25rem; border: 2px solid oklch(0.92 0 0); border-radius: 0.375rem; background-color: #ffffff; color: oklch(0.20 0 0); outline: none; transition: all 0.2s ease-in-out; }`,
			`.${modifier}${safeUtility}::placeholder { color: oklch(0.60 0 0); }`,
			`.${modifier}${safeUtility}:hover { border-color: oklch(0.85 0 0); }`,
			`.${modifier}${safeUtility}:focus { border-color: ${baseColor}; }`].join('');
			
		return styleBody;
	}
};