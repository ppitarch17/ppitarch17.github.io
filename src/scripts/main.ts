import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(s));
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

/* ---------- Smooth scroll ---------- */
let lenis: Lenis | null = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.11 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
for (const a of $$<HTMLAnchorElement>('a[href^="#"]')) {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href')!;
    const target = id === '#top' ? document.body : $(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target as HTMLElement, { duration: 1.4 });
    else target.scrollIntoView();
  });
}

/* ---------- Flexing type: letters widen and thicken near the pointer ---------- */
interface FlexOpts {
  base: { wdth: number; wght: number };
  near: { wdth: number; wght: number };
  radius: number;
}
interface FlexChar {
  el: HTMLElement;
  wdth: number;
  wght: number;
}

const pointer = { x: -9999, y: -9999 };
window.addEventListener('pointermove', (e) => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
});
document.documentElement.addEventListener('pointerleave', () => {
  pointer.x = pointer.y = -9999;
});

function splitChars(root: HTMLElement): HTMLElement[] {
  const chars: HTMLElement[] = [];
  for (const line of Array.from(root.children) as HTMLElement[]) {
    const text = line.textContent ?? '';
    line.textContent = '';
    for (const ch of text) {
      const s = document.createElement('span');
      s.className = 'flex-char';
      s.textContent = ch;
      line.append(s);
      chars.push(s);
    }
  }
  return chars;
}

function flexText(root: HTMLElement, opts: FlexOpts, getOffset: () => number = () => 0) {
  const chars: FlexChar[] = splitChars(root).map((el) => ({ el, wdth: opts.base.wdth, wght: opts.base.wght }));
  let visible = false;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(root);

  const apply = (c: FlexChar) => {
    c.el.style.setProperty('--wdth', c.wdth.toFixed(1));
    c.el.style.setProperty('--wght', c.wght.toFixed(0));
  };
  chars.forEach(apply);
  if (reduced) return chars;

  gsap.ticker.add(() => {
    if (!visible) return;
    const offset = getOffset();
    for (const c of chars) {
      const r = c.el.getBoundingClientRect();
      const d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2));
      const p = finePointer ? smooth(clamp01(1 - d / opts.radius)) : 0;
      const tw = opts.base.wdth + (opts.near.wdth - opts.base.wdth) * p - offset * 45;
      const tg = opts.base.wght + (opts.near.wght - opts.base.wght) * p - offset * 500;
      c.wdth += (Math.max(50, tw) - c.wdth) * 0.14;
      c.wght += (Math.max(100, tg) - c.wght) * 0.14;
      apply(c);
    }
  });
  return chars;
}

/* ---------- Hero ---------- */
const hero = $('[data-flex="hero"]');
let heroExit = 0;
if (hero) {
  const chars = flexText(hero, { base: { wdth: 100, wght: 800 }, near: { wdth: 150, wght: 900 }, radius: 340 }, () => heroExit);

  if (!reduced) {
    // Scrolling away squeezes the name narrow and light
    ScrollTrigger.create({
      trigger: '#top',
      start: 'top top',
      end: 'bottom top',
      onUpdate: (s) => (heroExit = s.progress),
    });
    gsap.to(hero, { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true } });

    // The single page-load moment: letters arrive thin and narrow, then settle heavy
    // (the ticker eases each letter from these values back to its resting axes)
    for (const c of chars) {
      c.wdth = 50;
      c.wght = 100;
    }
    gsap.set(chars.map((c) => c.el), { yPercent: 40, opacity: 0 });
    gsap.to(chars.map((c) => c.el), { yPercent: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.045, delay: 0.1 });
    gsap.to('[data-load]', { opacity: 1, duration: 1, delay: 0.9, ease: 'power2.out' });
  }
}

/* ---------- Contact email ---------- */
const emailEl = $('[data-flex="email"]');
if (emailEl) flexText(emailEl, { base: { wdth: 90, wght: 700 }, near: { wdth: 140, wght: 900 }, radius: 260 });

/* ---------- About: the red dot flies Castellón → Singapore → Seoul ---------- */
const route = $('#route');
if (route) {
  const arcs = $$<SVGPathElement>('.route-arc', route);
  const placesEls = $$('.route-place', route);
  const captions = $$('.route-caption', route);
  const dot = $<SVGCircleElement>('#route-dot');
  const lens = arcs.map((a) => a.getTotalLength());
  const setRoute = (p: number) => {
    // p 0..1 spread across the arcs; a place lights up once the dot reaches it
    const span = p * arcs.length;
    arcs.forEach((a, i) => {
      const v = clamp01(span - i);
      a.style.strokeDasharray = `${lens[i]}`;
      a.style.strokeDashoffset = String(lens[i] * (1 - v));
    });
    const i = Math.min(arcs.length - 1, Math.floor(span));
    const pt = arcs[i].getPointAtLength(lens[i] * clamp01(span - i));
    dot?.setAttribute('cx', pt.x.toFixed(1));
    dot?.setAttribute('cy', pt.y.toFixed(1));
    const reached = (k: number) => k === 0 || span >= k - 0.06;
    placesEls.forEach((el, k) => el.style.setProperty('opacity', reached(k) ? '1' : '0.35'));
    captions.forEach((el, k) => {
      el.style.opacity = reached(k) ? '1' : '0.35';
      el.style.transition = 'opacity 0.4s';
    });
  };
  if (reduced) setRoute(1);
  else {
    setRoute(0);
    ScrollTrigger.create({ trigger: route, start: 'top 75%', end: 'bottom 75%', scrub: 0.6, onUpdate: (st) => setRoute(st.progress) });
  }
}

/* ---------- Experience: vertical scroll drives a horizontal lap ---------- */
const mm = gsap.matchMedia();
mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
  const track = $('#laps-track');
  if (!track) return;
  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
  const lap = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: '#laps',
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  });
  gsap.fromTo('#kerb', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '#laps', start: 'top top', end: () => `+=${distance()}`, scrub: true } });
  for (const line of $$('.lap-line')) {
    gsap.to(line, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: line.closest('.lap'), containerAnimation: lap, start: 'left 75%', end: 'right 75%', scrub: true },
    });
  }
});
if (reduced || window.innerWidth < 1024) gsap.set('.lap-line', { scaleX: 1 });

/* ---------- UJI logo: the red dot rides the team swoosh ---------- */
const logoDraw = $<SVGPathElement>('#logo-draw');
const logoTrail = $<SVGPathElement>('#logo-trail');
const logoDot = $<SVGCircleElement>('#logo-dot');
const logoBtn = $('#uji-logo');
let logoProgress = reduced ? 1 : 0;
let lapping = false;
const logoLen = logoDraw?.getTotalLength() ?? 0;

function placeDot(len: number) {
  const pt = logoDraw!.getPointAtLength(len);
  logoDot!.setAttribute('cx', pt.x.toFixed(1));
  logoDot!.setAttribute('cy', pt.y.toFixed(1));
}
function setLogoProgress(p: number) {
  logoProgress = p;
  if (!logoDraw || lapping) return;
  logoDraw.style.strokeDasharray = `${logoLen}`;
  logoDraw.style.strokeDashoffset = String(logoLen * (1 - p));
  placeDot(logoLen * p);
}

function hotLap(rev = false) {
  if (!logoDraw || !logoTrail || reduced || lapping) return;
  lapping = true;
  const seg = 220;
  logoTrail.style.strokeDasharray = `${seg} ${logoLen + seg}`;
  gsap.set('#logo-trail-fill', { opacity: 1 });
  const s = { t: 0 };
  if (rev) gsap.fromTo('#uji-logo svg', { x: -3 }, { x: 3, duration: 0.05, repeat: 5, yoyo: true, clearProps: 'x' });
  gsap.to(s, {
    t: 1,
    duration: rev ? 0.9 : 1.2,
    delay: rev ? 0.3 : 0,
    ease: 'power2.inOut',
    onUpdate: () => {
      const head = s.t * logoLen;
      logoTrail.style.strokeDashoffset = String(seg - head);
      placeDot(head);
    },
    onComplete: () => {
      gsap.to('#logo-trail-fill', { opacity: 0, duration: 0.5 });
      // ease the dot back to where scrolling left it
      const back = { len: logoLen };
      gsap.to(back, {
        len: logoLen * logoProgress,
        duration: 0.6,
        ease: 'power3.out',
        onUpdate: () => placeDot(back.len),
        onComplete: () => {
          lapping = false;
          setLogoProgress(logoProgress);
        },
      });
    },
  });
}

if (logoDraw && logoDot) {
  setLogoProgress(logoProgress);
  if (finePointer) logoBtn?.addEventListener('pointerenter', () => hotLap());
  logoBtn?.addEventListener('click', () => hotLap(true));
  if (!reduced) {
    // Phones: draw the logo as it scrolls into view (desktop drives it from the pinned timeline below)
    mm.add('(max-width: 1023px)', () => {
      ScrollTrigger.create({ trigger: logoBtn, start: 'top 90%', end: 'top 45%', scrub: true, onUpdate: (self) => setLogoProgress(self.progress) });
    });
  }
}

/* ---------- UJIERT_03: the photo opens up, then each beat swaps text and photo ---------- */
mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
  const beats = $$('#ujiert .beat');
  const imgs = $$('#ujiert .ujiert-img');
  if (!beats.length || beats.length !== imgs.length) return;
  gsap.set(beats.slice(1), { autoAlpha: 0, y: 24 });
  gsap.set(imgs.slice(1), { autoAlpha: 0 });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#ujiert',
      start: 'top top',
      end: `+=${beats.length * 70}%`,
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => setLogoProgress(self.progress),
    },
  });
  tl.fromTo('#ujiert-photo', { clipPath: 'inset(14% 18% 14% 0% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 4px)', duration: 1, ease: 'none' }, 0);
  tl.fromTo(imgs[0], { scale: 1.25 }, { scale: 1, duration: 1, ease: 'none' }, 0);
  beats.forEach((_, i) => {
    if (i === 0) return;
    tl.to(beats[i - 1], { autoAlpha: 0, y: -24, duration: 0.25 }, i);
    tl.to(beats[i], { autoAlpha: 1, y: 0, duration: 0.25 }, i + 0.15);
    tl.to(imgs[i - 1], { autoAlpha: 0, duration: 0.35 }, i);
    tl.fromTo(imgs[i], { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 0.5 }, i);
  });
  tl.to({}, { duration: 0.4 });
});

/* ---------- Magnetis: the site scrolls inside its window, the drone shot drifts ---------- */
const mgScroll = $('#magnetis-scroll');
if (mgScroll && !reduced) {
  gsap.to(mgScroll, {
    y: () => -(mgScroll.offsetHeight - (mgScroll.parentElement?.offsetHeight ?? 0)),
    ease: 'none',
    scrollTrigger: { trigger: '#magnetis', start: 'top 70%', end: 'bottom 30%', scrub: 0.8, invalidateOnRefresh: true },
  });
  gsap.fromTo('#magnetis-drone', { yPercent: 30, rotation: -4 }, {
    yPercent: -10,
    rotation: 2,
    ease: 'none',
    scrollTrigger: { trigger: '#magnetis', start: 'top bottom', end: 'bottom top', scrub: true },
  });
}

/* ---------- Start to finish: the dot drives through five sectors ---------- */
const phaseTrack = $('#phase-track');
if (phaseTrack) {
  const phaseEls = $$('.phase', phaseTrack);
  const fills = $$('.phase-fill', phaseTrack);
  const names = $$('.phase-name', phaseTrack);
  const dot = $('#phase-dot');
  const vertical = () => window.innerWidth < 768;
  const setLap = (p: number) => {
    fills.forEach((f, i) => {
      const v = clamp01(p * fills.length - i);
      gsap.set(f, vertical() ? { scaleY: v, scaleX: 1 } : { scaleX: v, scaleY: 1 });
      names[i].style.color = v > 0 ? '' : 'var(--color-steel-light)';
    });
    if (dot) dot.style.left = `${p * 100}%`;
  };
  if (reduced) setLap(1);
  else {
    setLap(0);
    ScrollTrigger.create({ trigger: phaseTrack, start: 'top 80%', end: 'bottom 50%', scrub: true, onUpdate: (s) => setLap(s.progress) });
  }

  const projectBtns = $$<HTMLButtonElement>('.phase-project');
  const focus = (btn: HTMLButtonElement | null) => {
    if (!btn) return phaseTrack.removeAttribute('data-focus');
    const on = btn.dataset.phases!.split(',');
    phaseTrack.setAttribute('data-focus', '');
    phaseEls.forEach((el) => el.classList.toggle('is-on', on.includes(el.dataset.phase!)));
  };
  const pressed = () => projectBtns.find((b) => b.getAttribute('aria-pressed') === 'true') ?? null;
  for (const btn of projectBtns) {
    btn.addEventListener('click', () => {
      const wasOn = btn.getAttribute('aria-pressed') === 'true';
      projectBtns.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', String(!wasOn));
      focus(pressed());
    });
    if (finePointer) {
      btn.addEventListener('pointerenter', () => focus(btn));
      btn.addEventListener('pointerleave', () => focus(pressed()));
    }
  }
}

/* ---------- AI: the request types itself as you scroll ---------- */
const promptBox = $('#prompt');
const ask = $('#prompt-ask');
const answer = $('#prompt-answer');
if (promptBox && ask && answer && !reduced) {
  const full = ask.dataset.text!;
  ask.textContent = '';
  gsap.set(answer, { opacity: 0, y: 16 });
  ScrollTrigger.create({
    trigger: promptBox,
    start: 'center 60%',
    end: '+=500',
    pin: true,
    scrub: true,
    onUpdate: ({ progress }) => {
      const n = Math.round(full.length * clamp01(progress / 0.7));
      ask.textContent = full.slice(0, n);
      ask.classList.toggle('typing', n < full.length);
      gsap.to(answer, { opacity: progress > 0.78 ? 1 : 0, y: progress > 0.78 ? 0 : 16, duration: 0.4, overwrite: true });
    },
  });
}

/* ---------- Gravity Puzzle: flip gravity on the screenshot and the title ---------- */
const gravityTitle = $('#gravity-title');
const gravityImg = $('#gravity-img');
if (gravityTitle && gravityImg) {
  const text = gravityTitle.textContent ?? '';
  gravityTitle.setAttribute('aria-label', text);
  gravityTitle.textContent = '';
  const letters = [...text].map((ch) => {
    const s = document.createElement('span');
    s.className = 'inline-block';
    s.setAttribute('aria-hidden', 'true');
    s.textContent = ch === ' ' ? ' ' : ch;
    gravityTitle.append(s);
    return s;
  });
  let flipped = false;
  for (const btn of $$('.gravity-flip')) {
    btn.addEventListener('click', () => {
      flipped = !flipped;
      const rotation = flipped ? 180 : 0;
      if (reduced) {
        gsap.set(gravityImg, { rotation });
        gsap.set(letters, { scaleY: flipped ? -1 : 1 });
        return;
      }
      gsap.to(gravityImg, { rotation, duration: 0.9, ease: 'back.inOut(1.6)' });
      gsap.to(letters, { scaleY: flipped ? -1 : 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.035 });
    });
  }
}

/* ---------- Copy email ---------- */
const copyBtn = $('#copy-email');
const copyStatus = $('#copy-status');
copyBtn?.addEventListener('click', async () => {
  const email = copyBtn.dataset.email!;
  try {
    await navigator.clipboard.writeText(email);
  } catch {
    window.location.href = `mailto:${email}`;
    return;
  }
  if (!copyStatus) return;
  copyStatus.textContent = 'Copied to your clipboard';
  copyStatus.classList.add('text-red');
  setTimeout(() => {
    copyStatus.textContent = 'Click to copy';
    copyStatus.classList.remove('text-red');
  }, 2200);
});

/* ---------- Racing line through the right gutter ---------- */
const svg = $<SVGSVGElement>('#racing-line');
const ghost = $<SVGPathElement>('#line-ghost');
const drawn = $<SVGPathElement>('#line-drawn');
const car = $<SVGCircleElement>('#line-car');
const main = $('main');
let samples: { len: number; y: number }[] = [];
let total = 0;
let carLen = 0;

function buildLine() {
  if (!svg || !ghost || !drawn || !main || window.innerWidth < 1024) return;
  const W = document.documentElement.clientWidth;
  const H = main.scrollHeight;
  svg.setAttribute('width', String(W));
  svg.setAttribute('height', String(H));
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  const gx = W * 0.945;
  const amp = W * 0.028;
  const start = { x: gx, y: window.innerHeight * 0.18 };
  const end = H - 260;
  const step = 460;
  let d = `M ${start.x} ${start.y}`;
  let x0 = start.x;
  let y0 = start.y;
  let flip = 1;
  while (y0 < end) {
    const y1 = Math.min(end, y0 + step * (0.75 + ((y0 * 7) % 100) / 200));
    const x1 = gx + amp * flip * (y1 === end ? 0 : 1);
    const dy = y1 - y0;
    d += ` C ${x0} ${y0 + dy * 0.55}, ${x1} ${y1 - dy * 0.55}, ${x1} ${y1}`;
    x0 = x1;
    y0 = y1;
    flip *= -1;
  }
  ghost.setAttribute('d', d);
  drawn.setAttribute('d', d);
  total = drawn.getTotalLength();
  samples = [];
  for (let i = 0; i <= 600; i++) {
    const len = (total * i) / 600;
    samples.push({ len, y: drawn.getPointAtLength(len).y });
  }
  drawn.style.strokeDasharray = `${total}`;
  if (reduced) {
    drawn.style.strokeDashoffset = '0';
    car?.setAttribute('opacity', '0');
  }
}

function lenAtY(y: number) {
  if (!samples.length) return 0;
  if (y <= samples[0].y) return 0;
  for (let i = 1; i < samples.length; i++) {
    if (samples[i].y >= y) {
      const a = samples[i - 1];
      const b = samples[i];
      return a.len + ((y - a.y) / (b.y - a.y || 1)) * (b.len - a.len);
    }
  }
  return total;
}

if (svg && !reduced) {
  gsap.ticker.add(() => {
    if (!samples.length || !drawn || !car) return;
    const target = lenAtY(window.scrollY + window.innerHeight * 0.55);
    carLen += (target - carLen) * 0.18;
    drawn.style.strokeDashoffset = String(total - carLen);
    const p = drawn.getPointAtLength(carLen);
    car.setAttribute('cx', p.x.toFixed(1));
    car.setAttribute('cy', p.y.toFixed(1));
  });
}
ScrollTrigger.addEventListener('refresh', buildLine);

/* ---------- Nav: tucks away while scrolling down ---------- */
const nav = $('#nav');
ScrollTrigger.create({
  start: 0,
  end: 'max',
  onUpdate: (self) => {
    if (nav) nav.style.transform = self.direction === 1 && self.scroll() > 400 ? 'translateY(-100%)' : '';
  },
});

document.documentElement.dataset.ready = '1';
window.addEventListener('load', () => ScrollTrigger.refresh());
document.fonts?.ready.then(() => ScrollTrigger.refresh());
buildLine();
