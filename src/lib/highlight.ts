// Select-to-read: highlight any text on the page and it loads into the RSVP reader,
// paused on the first word. The reader's own controls are ignored, so clicking
// Play/Pause never re-triggers a re-read (which used to desync the button).
import type { Rsvp } from "./rsvp";

const WORDCHAR = /[A-Za-z0-9]/;

// Grow the selection out to whole words so a mid-word highlight still reads the full word.
function expandToWord(sel: Selection): string {
  if (sel.rangeCount === 0) return "";
  const range = sel.getRangeAt(0).cloneRange();
  const { startContainer, endContainer } = range;
  if (startContainer.nodeType === Node.TEXT_NODE) {
    const t = startContainer.textContent ?? "";
    let s = range.startOffset;
    while (s > 0 && WORDCHAR.test(t[s - 1])) s--;
    range.setStart(startContainer, s);
  }
  if (endContainer.nodeType === Node.TEXT_NODE) {
    const t = endContainer.textContent ?? "";
    let e = range.endOffset;
    while (e < t.length && WORDCHAR.test(t[e])) e++;
    range.setEnd(endContainer, e);
  }
  return range.toString();
}

export function initHighlight(rsvp: Rsvp, rsvpEl: HTMLElement): void {
  document.addEventListener("mouseup", (e) => {
    if (e.target instanceof Node && rsvpEl.contains(e.target)) return; // reader's own controls
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
    if (sel.anchorNode && rsvpEl.contains(sel.anchorNode)) return; // selection made inside the reader
    const text = expandToWord(sel).replace(/\s+/g, " ").trim();
    if (text.length < 12) return; // ignore tiny / accidental selections
    rsvp.setSource(text, "highlight"); // loads paused on the first word; user presses Play
  });
}
