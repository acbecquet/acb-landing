// Balanced, no-orphan headlines via pretext (text measurement, no DOM reflow).
// For each headline we measure with pretext and find the narrowest width that keeps
// the same line count — the classic "balance" that avoids a lone orphan word.
import { prepare, layout } from "@chenglou/pretext";

function fontString(cs: CSSStyleDeclaration): string {
  return `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
}

function balanceOne(el: HTMLElement): void {
  const text = (el.textContent ?? "").trim();
  if (!text) return;

  const cs = getComputedStyle(el);
  const lineHeight = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;

  // Drop any width constraint so we can read the true available width, then balance within it.
  el.style.maxWidth = "none";
  const containerWidth = el.clientWidth;
  if (containerWidth <= 0) return;

  let prepared;
  try {
    prepared = prepare(text, fontString(cs));
  } catch {
    el.style.maxWidth = "";
    return;
  }

  const baseLines = layout(prepared, containerWidth, lineHeight).lineCount;
  if (baseLines <= 1) {
    el.style.maxWidth = "";
    return;
  }

  // Binary search the narrowest width that still fits in `baseLines` lines.
  let lo = 0;
  let hi = containerWidth;
  let best = containerWidth;
  for (let k = 0; k < 12; k++) {
    const mid = (lo + hi) / 2;
    if (layout(prepared, mid, lineHeight).lineCount <= baseLines) {
      best = mid;
      hi = mid;
    } else {
      lo = mid;
    }
  }
  el.style.maxWidth = `${Math.ceil(best)}px`;
}

export function balanceHeadlines(selector: string): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (els.length === 0) return;
  const run = (): void => els.forEach(balanceOne);

  run();
  document.fonts.ready.then(run);

  let t: number | undefined;
  window.addEventListener("resize", () => {
    if (t) clearTimeout(t);
    t = window.setTimeout(run, 150);
  });
}
