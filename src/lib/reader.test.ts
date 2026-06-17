// Integration: drive the real RSVP engine + select-to-read wiring through the exact
// sequence from the bug report, asserting the Play/Pause button never desyncs from state.
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createRsvp } from "./rsvp";
import { initHighlight } from "./highlight";

const READER = `
<p id="prose">the quick brown fox jumps over the lazy dog again and again today</p>
<div id="rsvp">
  <span id="rsvpSrc"></span>
  <div class="word"></div>
  <button id="play">▶<span class="lbl">Play</span></button>
  <button id="restart"></button>
  <button id="toggleFull"><span class="lbl"></span></button>
  <span id="wpmLabel"></span>
  <input id="wpmEntry" hidden />
  <input id="wpm" type="range" min="150" max="700" value="350" />
  <div id="full"></div>
</div>`;

const playing = (): boolean =>
  document.getElementById("play")!.innerHTML.includes("Pause");

// A real click is mouseup (bubbles to the document highlight listener) then click (the toggle).
const pressPlay = (): void => {
  const play = document.getElementById("play")!;
  play.dispatchEvent(new Event("mouseup", { bubbles: true }));
  play.dispatchEvent(new Event("click", { bubbles: true }));
};

const selectProse = (start: number, end: number): void => {
  const prose = document.getElementById("prose")!;
  const range = document.createRange();
  range.setStart(prose.firstChild!, start);
  range.setEnd(prose.firstChild!, end);
  const sel = window.getSelection()!;
  sel.removeAllRanges();
  sel.addRange(range);
  prose.dispatchEvent(new Event("mouseup", { bubbles: true }));
};

describe("reader Play/Pause never desyncs", () => {
  beforeEach(() => {
    document.body.innerHTML = READER;
    const fonts = (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts;
    if (!fonts || !fonts.ready) {
      Object.defineProperty(document, "fonts", { value: { ready: Promise.resolve() }, configurable: true });
    }
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  it("toggles Play → Pause → Play cleanly", () => {
    createRsvp(document.getElementById("rsvp")!, "alpha beta gamma delta");
    expect(playing()).toBe(false);
    pressPlay();
    expect(playing()).toBe(true);
    pressPlay();
    expect(playing()).toBe(false);
  });

  it("highlight loads paused on the first word (no autoplay)", () => {
    const rsvp = createRsvp(document.getElementById("rsvp")!, "alpha beta gamma");
    initHighlight(rsvp, document.getElementById("rsvp")!);
    selectProse(0, 19); // "the quick brown fox"
    expect(playing()).toBe(false);
    expect(document.getElementById("rsvpSrc")!.textContent).toContain("highlighted");
  });

  it("pausing with a stray page selection still stops (the reported desync)", () => {
    const rsvp = createRsvp(document.getElementById("rsvp")!, "alpha beta gamma delta");
    initHighlight(rsvp, document.getElementById("rsvp")!);
    selectProse(0, 19); // highlight → paused on first word
    pressPlay(); // start playback
    expect(playing()).toBe(true);
    // prose is STILL selected; clicking Pause must cleanly stop, not re-read + flip back
    pressPlay();
    expect(playing()).toBe(false);
  });
});
