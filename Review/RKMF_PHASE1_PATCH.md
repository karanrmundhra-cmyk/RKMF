# RKMF — Phase 1 Patch Record

**File changed (only this one):** `RKMF-Premium-Final-Preview.html`
**Date:** 19 Jun 2026
**Status:** Implemented in the local **preview** file. **NOT deployed** to production. No other file touched.
**Scope:** 7 approved changes across 3 regions — the "Four Ways" heading, the Heal/Shelter cards, and the Before/After slider (CSS + HTML + JS). Nothing else was modified.

---

## Summary

| # | Approved change | Region | File lines |
|---|---|---|---|
| 1 | One-line heading | "What We Do" heading + new `.oneline` CSS | 231 · 67–68 |
| 2 | Heal image replacement | Four-Ways "Heal" card `<img>` | 235 |
| 3 | Shelter image replacement | Four-Ways "Shelter" card `<img>` | 236 |
| 4 | Slider enhancement (interaction/feel) | Slider CSS | 92–102 |
| 5 | Slider accessibility | Slider HTML opening tag | 262 |
| 6 | Slider mobile interaction | Slider JS (Pointer Events) | 406 |
| 7 | 2–98% clamp | Slider JS (within #6) | 406 |

All other sections — copy, colours, typography, navigation, donation flow, Razorpay, donor data, compliance, and every other image — are unchanged.

---

## Change 1 — One-line heading

**1a. CSS — added after the `.wwd` media query (lines 67–68)**

Before:
```css
(did not exist)
```
After:
```css
.oneline{white-space:nowrap}
@media(max-width:760px){.oneline{white-space:normal}}
```

**1b. HTML — heading wrapper (line 231)**

Before:
```html
<div class="reveal" style="max-width:640px"><span class="eyebrow">What We Do</span><h2 class="d2" style="margin-top:14px">Four ways we show up for animals.</h2></div>
```
After:
```html
<div class="reveal" style="max-width:none"><span class="eyebrow">What We Do</span><h2 class="d2 oneline" style="margin-top:14px">Four ways we show up for animals.</h2></div>
```

---

## Change 2 — Heal image (line 235)

Before:
```html
<div class="wcard reveal"><img src="https://rkmfoundation.com/images/site/heal.jpg" alt=""><div class="t"><small>With trusted vets</small><h3>Heal</h3></div></div>
```
After:
```html
<div class="wcard reveal"><img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80" alt="A golden retriever holding a flower"><div class="t"><small>With trusted vets</small><h3>Heal</h3></div></div>
```
Source: Unsplash (free license). Photo id `photo-1552053831-71594a27632d`.

---

## Change 3 — Shelter image (line 236)

Before:
```html
<div class="wcard reveal"><img src="https://rkmfoundation.com/images/site/rest.jpg" alt=""><div class="t"><small>A place to rest</small><h3>Shelter</h3></div></div>
```
After:
```html
<div class="wcard reveal"><img src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=80" alt="A rescued ginger cat resting"><div class="t"><small>A place to rest</small><h3>Shelter</h3></div></div>
```
Source: Unsplash (free license). Photo id `photo-1573865526739-10659fec78a5`.

---

## Changes 4–7 — Before/After slider

**4. CSS — slider block (lines 92–102)**

Before:
```css
.slider{position:relative;aspect-ratio:16/9;max-width:980px;margin:42px auto 0;overflow:hidden;border-radius:18px;border:1px solid var(--line);user-select:none;cursor:ew-resize}
.slider img{position:absolute;inset:0;pointer-events:none}.slider .af{clip-path:inset(0 0 0 50%)}
.slider .lb{position:absolute;top:15px;z-index:4;font-size:11px;letter-spacing:.14em;text-transform:uppercase;background:rgba(255,255,255,.92);color:var(--black);padding:6px 12px;border-radius:100px}
.slider .lb.l{left:15px}.slider .lb.r{right:15px;background:var(--dgold);color:#fff}
.hd{position:absolute;top:0;bottom:0;left:50%;width:2px;background:#fff;z-index:5}
.hd::after{content:"⟺";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44px;height:44px;border-radius:50%;background:var(--dgold);color:#fff;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
```
After:
```css
.slider{position:relative;aspect-ratio:16/9;max-width:980px;margin:42px auto 0;overflow:hidden;border-radius:18px;border:1px solid var(--line);user-select:none;cursor:ew-resize;touch-action:none}
.slider:focus-visible{outline:3px solid var(--gold);outline-offset:3px}
.slider img{position:absolute;inset:0;pointer-events:none}
.slider .af{clip-path:inset(0 0 0 50%);transition:clip-path .22s cubic-bezier(.22,1,.36,1)}
.slider.dragging .af{transition:none}
.slider .lb{position:absolute;top:15px;z-index:4;font-size:11px;letter-spacing:.14em;text-transform:uppercase;background:rgba(255,255,255,.92);color:var(--black);padding:6px 12px;border-radius:100px}
.slider .lb.l{left:15px}.slider .lb.r{right:15px;background:var(--dgold);color:#fff}
.hd{position:absolute;top:0;bottom:0;left:50%;width:2px;background:#fff;z-index:5;transition:left .22s cubic-bezier(.22,1,.36,1)}
.slider.dragging .hd{transition:none}
.hd::after{content:"⟺";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44px;height:44px;border-radius:50%;background:var(--dgold);color:#fff;display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3);transition:transform .2s ease,box-shadow .2s ease}
.slider:hover .hd::after{transform:translate(-50%,-50%) scale(1.08);box-shadow:0 10px 28px rgba(0,0,0,.36)}
.slider:focus-visible .hd::after,.slider.dragging .hd::after{transform:translate(-50%,-50%) scale(1.12);box-shadow:0 12px 30px rgba(0,0,0,.4)}
```
Added: `touch-action:none`; focus-visible outline; eased transitions on `.af`/`.hd` (disabled while `.dragging` for 1:1 tracking); knob hover scale 1.08, focus/drag scale 1.12 + deeper shadow. Colours/sizes unchanged.

**5. HTML — slider opening tag (line 262)**

Before:
```html
<div class="slider" id="slider">
```
After:
```html
<div class="slider" id="slider" role="slider" tabindex="0" aria-label="Before and after rescue comparison: drag or use arrow keys to compare" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
```
(The `<img>`s, labels "When we found him" / "Six weeks later", and handle on this line are unchanged.)

**6 & 7. JS — slider IIFE (line 406)**

Before:
```js
(function(){const s=document.getElementById('slider'),h=document.getElementById('hd'),a=document.getElementById('afimg');let d=false;function set(x){const r=s.getBoundingClientRect();let p=Math.max(.04,Math.min(.96,(x-r.left)/r.width));a.style.clipPath=`inset(0 0 0 ${p*100}%)`;h.style.left=p*100+'%';}s.addEventListener('mousedown',e=>{d=true;set(e.clientX);});addEventListener('mousemove',e=>d&&set(e.clientX));addEventListener('mouseup',()=>d=false);s.addEventListener('touchstart',e=>set(e.touches[0].clientX),{passive:true});s.addEventListener('touchmove',e=>set(e.touches[0].clientX),{passive:true});})();
```
After:
```js
(function(){const s=document.getElementById('slider'),h=document.getElementById('hd'),a=document.getElementById('afimg');let p=50;function apply(){a.style.clipPath=`inset(0 0 0 ${p}%)`;h.style.left=p+'%';s.setAttribute('aria-valuenow',Math.round(p));}function fromX(x){const r=s.getBoundingClientRect();p=Math.max(2,Math.min(98,((x-r.left)/r.width)*100));apply();}s.addEventListener('pointerdown',e=>{s.setPointerCapture(e.pointerId);s.classList.add('dragging');fromX(e.clientX);});s.addEventListener('pointermove',e=>{if(s.hasPointerCapture(e.pointerId))fromX(e.clientX);});s.addEventListener('pointerup',()=>s.classList.remove('dragging'));s.addEventListener('pointercancel',()=>s.classList.remove('dragging'));s.addEventListener('keydown',e=>{const k=e.key,step=(k==='PageUp'||k==='PageDown')?10:4;if(k==='ArrowLeft'||k==='ArrowDown'||k==='PageDown'){p=Math.max(2,p-step);}else if(k==='ArrowRight'||k==='ArrowUp'||k==='PageUp'){p=Math.min(98,p+step);}else if(k==='Home'){p=2;}else if(k==='End'){p=98;}else{return;}e.preventDefault();apply();});apply();})();
```
Changes: Pointer Events with `setPointerCapture` (drag continues off-element); `.dragging` toggle for 1:1 tracking; full keyboard (←→↑↓, PageUp/Dn, Home/End); live `aria-valuenow`; clamp **2–98%** (drag, keys, Home/End).

---

## Rollback instructions

This was a text-only patch to one file; rollback = restore each "Before" block.

**Full rollback (fastest):** restore `RKMF-Premium-Final-Preview.html` from a pre-19-Jun copy/backup (or git checkout of the prior version).

**Per-change rollback (manual):**
1. Line 231 → replace with the Change 1b **Before**; delete the two `.oneline` lines at 67–68.
2. Line 235 → replace with the Change 2 **Before** (`heal.jpg`).
3. Line 236 → replace with the Change 3 **Before** (`rest.jpg`).
4. Lines 92–102 → replace with the Change 4 **Before** (6-line slider CSS block).
5. Line 262 → remove the added `role`/`tabindex`/`aria-*` attributes (Change 5 **Before**).
6. Line 406 → replace with the Changes 6&7 **Before** (mouse/touch IIFE).

Each change is independent and reversible on its own.

---

## Verification checklist (before any deploy)

- [ ] Desktop: "Four ways we show up for animals." renders on **one line**.
- [ ] Desktop: Heal card = golden retriever w/ flower; Shelter card = ginger cat.
- [ ] Mobile (≤760px): heading wraps cleanly (no horizontal overflow).
- [ ] Slider: drag with mouse — smooth, handle stays inside frame (2–98%).
- [ ] Slider: drag with touch on a phone — no page-scroll conflict.
- [ ] Slider: Tab to focus (gold ring), then ←/→ move it; Home/End jump to ends.
- [ ] Nothing else on the page changed.

## Not touched (guardrails honoured)
copy · colours · typography · navigation · donation flow · Razorpay · donor data · compliance · all other images · section order.

**Phase 1 complete. Stop.**
