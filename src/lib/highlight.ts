// Select-to-read: highlight any text on the page and it plays in the RSVP reader.
import type { Rsvp } from "./rsvp";

export function initHighlight(rsvp: Rsvp, rsvpEl: HTMLElement): void {
  document.addEventListener("mouseup", () => {
    const sel = window.getSelection();
    const text = sel ? sel.toString().replace(/\s+/g, " ").trim() : "";
    if (text.length < 12) return; // ignore tiny / accidental selections
    if (sel && sel.anchorNode && rsvpEl.contains(sel.anchorNode)) return; // ignore selections inside the reader
    rsvp.setSource(text, "highlight");
    rsvp.play();
  });
}
