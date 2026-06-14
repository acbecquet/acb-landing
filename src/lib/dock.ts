// Scroll-LINKED anchored dock. As you scroll past the reader it pins under the nav and
// collapses to a compact bar. Design rules (in priority order):
//   1. The reader word NEVER moves horizontally and NEVER changes size — it is the fixed
//      anchor. It only translates vertically as the box collapses around it.
//   2. Play and the WPM slider are equal width at equal insets (set in CSS), so a
//      card-centered word automatically has even gaps on both sides — symmetric.
//   3. Play and the slider also only move vertically; the middle controls, label, and
//      focal guide fade out.
// Everything is a pure function of scroll position — no timed transition, no layout swap.

const DOCK_TOP = 76;
const DURATION = 200; // scroll px over which the morph completes

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const clamp01 = (t: number): number => (t < 0 ? 0 : t > 1 ? 1 : t);

interface Rel {
  cy: number;
}
interface Geo {
  home: number;
  H0: number;
  dockH: number;
  play: Rel;
  wpm: Rel;
  stage: Rel;
}

function relCy(el: Element, c: DOMRect): Rel {
  const r = el.getBoundingClientRect();
  return { cy: r.top - c.top + r.height / 2 };
}

export function initDock(rsvpEl: HTMLElement, slot: HTMLElement): void {
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
    const wordSize = Math.min(52, Math.max(30, 0.06 * window.innerWidth));
    geo = {
      home: c.top + window.scrollY - DOCK_TOP,
      H0: c.height,
      dockH: Math.round(wordSize + 20), // bar collapses to snugly fit the (unchanged) word
      play: relCy(playBtn, c),
      wpm: relCy(sliderEl, c),
      stage: relCy(stageEl, c),
    };
  }

  function apply(g: Geo, p: number): void {
    const cy = g.dockH / 2;
    rsvpEl.style.height = `${lerp(g.H0, g.dockH, p)}px`;
    // Vertical movement only — nothing drifts left/right, the word keeps its size.
    stageEl.style.transform = `translateY(${lerp(0, cy - g.stage.cy, p)}px)`;
    playBtn.style.transform = `translateY(${lerp(0, cy - g.play.cy, p)}px)`;
    sliderEl.style.transform = `translateY(${lerp(0, cy - g.wpm.cy, p)}px)`;
    labelEl.style.opacity = `${clamp01(1 - p * 2)}`;
    guideEl.style.opacity = `${clamp01(1 - p * 1.6)}`;
    midEl.style.opacity = `${clamp01(1 - p * 2.2)}`;
    midEl.style.pointerEvents = p > 0.4 ? "none" : "";
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
