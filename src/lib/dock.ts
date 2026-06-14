// Scroll-LINKED anchored dock. As you scroll past the reader it pins under the nav and
// every element's position/size is interpolated from its measured expanded spot to its
// docked spot as a pure function of scroll position — no timed transition, no layout swap.
//
// Layout choices that keep the motion clean:
//  - Play and the WPM slider already sit at the left/right edges (controls use
//    space-between), so they only ever move VERTICALLY into the bar.
//  - The word slides to the exact midpoint between Play's right edge and the slider's
//    left edge, so the docked bar has even spacing on both sides.
//  - The middle controls, the label, and the focal guide simply fade out.

const DOCK_TOP = 76;
const DOCK_H = 62;
const DURATION = 200; // scroll px over which the morph completes
const WDOCK = 30; // docked playing-word font size

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const clamp01 = (t: number): number => (t < 0 ? 0 : t > 1 ? 1 : t);

interface Rel {
  cx: number;
  cy: number;
  w: number;
}
interface Geo {
  home: number;
  H0: number;
  play: Rel;
  wpm: Rel;
  stage: Rel;
  wExp: number;
}

function rel(el: Element, c: DOMRect): Rel {
  const r = el.getBoundingClientRect();
  return { cx: r.left - c.left + r.width / 2, cy: r.top - c.top + r.height / 2, w: r.width };
}

export function initDock(rsvpEl: HTMLElement, slot: HTMLElement, wordEl: HTMLElement): void {
  const stageEl = rsvpEl.querySelector<HTMLElement>(".stage")!;
  const guideEl = rsvpEl.querySelector<HTMLElement>(".guide")!;
  const labelEl = rsvpEl.querySelector<HTMLElement>(".label")!;
  const sliderEl = rsvpEl.querySelector<HTMLElement>(".slider")!;
  const midEl = rsvpEl.querySelector<HTMLElement>(".controls-mid")!;
  const playBtn = rsvpEl.querySelector<HTMLElement>("#play")!;

  let geo: Geo | null = null;
  let pinned = false;
  let ticking = false;

  function measure(): void {
    if (pinned) return; // measure only in the natural (expanded) state
    const c = rsvpEl.getBoundingClientRect();
    geo = {
      home: c.top + window.scrollY - DOCK_TOP,
      H0: c.height,
      play: rel(playBtn, c),
      wpm: rel(sliderEl, c),
      stage: rel(stageEl, c),
      wExp: Math.min(52, Math.max(30, 0.06 * window.innerWidth)),
    };
  }

  function apply(g: Geo, p: number): void {
    const cy = DOCK_H / 2;
    rsvpEl.style.height = `${lerp(g.H0, DOCK_H, p)}px`;

    // word: glide to the midpoint between the two controls (even gaps) + up to the bar center.
    const wordCx = (g.play.cx + g.play.w / 2 + (g.wpm.cx - g.wpm.w / 2)) / 2;
    stageEl.style.transform = `translate(${lerp(0, wordCx - g.stage.cx, p)}px,${lerp(0, cy - g.stage.cy, p)}px)`;

    // Play & slider are already at the edges → vertical movement only.
    playBtn.style.transform = `translateY(${lerp(0, cy - g.play.cy, p)}px)`;
    sliderEl.style.transform = `translateY(${lerp(0, cy - g.wpm.cy, p)}px)`;

    labelEl.style.opacity = `${clamp01(1 - p * 2)}`;
    guideEl.style.opacity = `${clamp01(1 - p * 1.6)}`;
    midEl.style.opacity = `${clamp01(1 - p * 2.2)}`;
    midEl.style.pointerEvents = p > 0.4 ? "none" : "";

    wordEl.style.fontSize = wordEl.classList.contains("idle") ? "" : `${lerp(g.wExp, WDOCK, p)}px`;
  }

  function reset(): void {
    rsvpEl.style.height = "";
    stageEl.style.transform = "";
    playBtn.style.transform = "";
    sliderEl.style.transform = "";
    labelEl.style.opacity = "";
    guideEl.style.opacity = "";
    midEl.style.opacity = "";
    midEl.style.pointerEvents = "";
    wordEl.style.fontSize = "";
  }

  function update(): void {
    ticking = false;
    if (!geo) measure();
    if (!geo) return;
    const p = clamp01((window.scrollY - geo.home) / DURATION);
    if (p <= 0) {
      if (pinned) {
        pinned = false;
        rsvpEl.classList.remove("docked");
        slot.style.height = "";
        reset();
      }
      return;
    }
    if (!pinned) {
      pinned = true;
      slot.style.height = `${geo.H0}px`;
      rsvpEl.classList.add("docked");
    }
    apply(geo, p);
  }

  const onScroll = (): void => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    if (!pinned) geo = null;
    update();
  });
  window.addEventListener("load", () => {
    if (!pinned) {
      geo = null;
      update();
    }
  });
  document.fonts.ready.then(() => {
    if (!pinned) {
      geo = null;
      update();
    }
  });
  update();
}
