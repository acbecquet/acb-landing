// RSVP playback engine: ORP pivot, smart pacing, play/pause, and swappable source text.

export type RsvpSource = "story" | "highlight";

export interface Rsvp {
  setSource(text: string, label: RsvpSource): void;
  play(): void;
  stop(): void;
}

const ALNUM = /[A-Za-z0-9]/g;

function orp(word: string): number {
  const len = (word.match(ALNUM) ?? word).length;
  if (len <= 1) return 0;
  if (len <= 5) return 1;
  if (len <= 9) return 2;
  if (len <= 13) return 3;
  return 4;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function tokenize(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

function delayFor(word: string, wpm: number): number {
  let d = 60000 / wpm;
  if (/[.!?…]$/.test(word)) d *= 2.6;
  else if (/[,;:—]$/.test(word)) d *= 1.7;
  if (word.length > 9) d *= 1.25;
  return d;
}

export function createRsvp(root: HTMLElement, story: string): Rsvp {
  const wordEl = root.querySelector<HTMLElement>(".word")!;
  const playBtn = root.querySelector<HTMLButtonElement>("#play")!;
  const wpmEl = root.querySelector<HTMLInputElement>("#wpm")!;
  const wpmLabel = root.querySelector<HTMLElement>("#wpmLabel")!;
  const wpmEntry = root.querySelector<HTMLInputElement>("#wpmEntry")!;
  const fullEl = root.querySelector<HTMLElement>("#full")!;
  const srcLabel = root.querySelector<HTMLElement>("#rsvpSrc")!;
  const restartBtn = root.querySelector<HTMLButtonElement>("#restart")!;
  const toggleBtn = root.querySelector<HTMLButtonElement>("#toggleFull")!;

  let words = tokenize(story);
  let i = 0;
  let playing = false;
  let timer: number | undefined;
  let wpm = 350;

  fullEl.textContent = story;
  wpmEntry.value = String(wpm);

  // ── Adaptive word sizing (the SwiftUI minimumScaleFactor idea): scale the centred word
  //    to fit the room between Play and the WPM control, so it never crowds or overlaps on
  //    any screen size. Computed per source (fits the longest word) and on resize, and held
  //    constant while scrolling — only the screen size changes it.
  const MONO = 0.62; // JetBrains Mono advance width ≈ 0.62em
  const MIN_FONT = 14;
  const idleText = (): string =>
    window.innerWidth <= 560 ? "▶  press play" : "▶  my story, one word at a time";
  function availableWidth(): number {
    return root.clientWidth - 2 * playBtn.offsetWidth - 56;
  }
  function fitFont(maxLen: number, base: number): number {
    const f = availableWidth() / Math.max(maxLen, 1) / MONO;
    return Math.round(Math.max(MIN_FONT, Math.min(base, f)));
  }
  let wordFont = 0;
  function sizeWords(): void {
    const longest = words.reduce((m, w) => Math.max(m, w.length), 1);
    const base = Math.min(52, Math.max(30, 0.06 * window.innerWidth));
    wordFont = fitFont(longest, base);
  }
  function showIdle(): void {
    const t = idleText();
    wordEl.className = "word idle";
    wordEl.textContent = t;
    wordEl.style.fontSize = `${fitFont(t.length, 18)}px`;
  }
  function refit(): void {
    sizeWords();
    if (wordEl.classList.contains("idle")) showIdle();
    else wordEl.style.fontSize = `${wordFont}px`;
  }
  sizeWords();
  showIdle();
  let resizeTimer: number | undefined;
  window.addEventListener("resize", () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(refit, 120);
  });
  void document.fonts.ready.then(refit);

  function show(w: string): void {
    const p = Math.min(orp(w), w.length - 1);
    wordEl.className = "word";
    wordEl.style.fontSize = `${wordFont}px`;
    wordEl.innerHTML =
      `<span class="pre">${esc(w.slice(0, p))}</span>` +
      `<span class="piv">${esc(w[p] ?? "")}</span>` +
      `<span class="post">${esc(w.slice(p + 1))}</span>`;
  }

  function step(): void {
    if (i >= words.length) {
      stop();
      i = 0;
      return;
    }
    show(words[i]);
    i++;
    timer = window.setTimeout(step, delayFor(words[i - 1], wpm));
  }

  function play(): void {
    playing = true;
    playBtn.innerHTML = '❚❚<span class="lbl">Pause</span>';
    step();
  }

  function stop(): void {
    playing = false;
    playBtn.innerHTML = '▶<span class="lbl">Play</span>';
    if (timer) clearTimeout(timer);
  }

  function setSource(text: string, label: RsvpSource): void {
    stop();
    words = tokenize(text);
    sizeWords();
    i = 0;
    srcLabel.textContent =
      label === "highlight" ? "RSVP · your highlighted text" : "RSVP · your story";
  }

  playBtn.addEventListener("click", () => (playing ? stop() : play()));
  restartBtn.addEventListener("click", () => {
    setSource(story, "story");
    showIdle();
  });
  function setWpm(value: number): void {
    wpm = Math.min(700, Math.max(150, Math.round(value)));
    wpmEl.value = String(wpm);
    wpmEntry.value = String(wpm);
    wpmLabel.textContent = `${wpm} wpm`;
  }
  wpmEl.addEventListener("input", () => setWpm(Number(wpmEl.value)));

  // double-click the wpm number to type an exact speed (plain text field, no spinners)
  function closeEntry(commit: boolean): void {
    if (commit) {
      const n = parseInt(wpmEntry.value, 10);
      if (!Number.isNaN(n)) setWpm(n);
    }
    wpmEntry.value = String(wpm);
    wpmEntry.hidden = true;
    wpmLabel.hidden = false;
  }
  wpmLabel.addEventListener("dblclick", () => {
    wpmEntry.value = String(wpm);
    wpmLabel.hidden = true;
    wpmEntry.hidden = false;
    wpmEntry.focus();
    wpmEntry.select();
  });
  wpmEntry.addEventListener("keydown", (e) => {
    if (e.key === "Enter") closeEntry(true);
    else if (e.key === "Escape") closeEntry(false);
  });
  wpmEntry.addEventListener("blur", () => closeEntry(true));
  toggleBtn.addEventListener("click", () => {
    const shown = fullEl.classList.toggle("show");
    const lbl = toggleBtn.querySelector<HTMLElement>(".lbl");
    if (lbl) lbl.textContent = shown ? "Hide text" : "Read it normally";
  });

  return { setSource, play, stop };
}
