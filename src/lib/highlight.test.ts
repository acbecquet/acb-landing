import { describe, it, expect, vi, beforeEach } from "vitest";
import { initHighlight } from "./highlight";
import type { Rsvp } from "./rsvp";

const PROSE = "hello brave new world of speed reading";

function setup() {
  document.body.innerHTML =
    `<p id="prose">${PROSE}</p>` +
    `<div id="rsvp"><button id="play">▶<span class="lbl">Play</span></button></div>`;
  const rsvpEl = document.getElementById("rsvp")!;
  const rsvp: Rsvp = { setSource: vi.fn(), play: vi.fn(), stop: vi.fn() };
  initHighlight(rsvp, rsvpEl);
  return { rsvpEl, rsvp, prose: document.getElementById("prose")! };
}

function select(node: Node, start: number, end: number): void {
  const range = document.createRange();
  range.setStart(node, start);
  range.setEnd(node, end);
  const sel = window.getSelection()!;
  sel.removeAllRanges();
  sel.addRange(range);
}

describe("highlight → RSVP", () => {
  beforeEach(() => window.getSelection()?.removeAllRanges());

  it("loads a selection paused — never autoplays", () => {
    const { prose, rsvp } = setup();
    select(prose.firstChild!, 0, 17);
    prose.dispatchEvent(new Event("mouseup", { bubbles: true }));
    expect(rsvp.setSource).toHaveBeenCalledTimes(1);
    expect(rsvp.play).not.toHaveBeenCalled();
  });

  it("expands a mid-word selection out to whole words", () => {
    const { prose, rsvp } = setup();
    select(prose.firstChild!, 2, 14); // "llo brave ne" → should become "hello brave new"
    prose.dispatchEvent(new Event("mouseup", { bubbles: true }));
    expect(rsvp.setSource).toHaveBeenCalledWith("hello brave new", "highlight");
  });

  it("ignores mouseup from inside the reader (clicking Play/Pause never re-reads)", () => {
    const { prose, rsvpEl, rsvp } = setup();
    select(prose.firstChild!, 0, 17); // a prose selection lingers
    rsvpEl.querySelector("#play")!.dispatchEvent(new Event("mouseup", { bubbles: true }));
    expect(rsvp.setSource).not.toHaveBeenCalled();
  });

  it("ignores selections made inside the reader", () => {
    const { rsvpEl, rsvp } = setup();
    select(rsvpEl.querySelector(".lbl")!.firstChild!, 0, 4);
    document.body.dispatchEvent(new Event("mouseup", { bubbles: true }));
    expect(rsvp.setSource).not.toHaveBeenCalled();
  });
});
