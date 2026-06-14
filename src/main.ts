import "./styles/tokens.css";
import "./styles/styles.css";

import { STORY, mods } from "./content";
import { createRsvp } from "./lib/rsvp";
import { initHighlight } from "./lib/highlight";
import { initDock } from "./lib/dock";
import { initTheme } from "./lib/theme";
import { balanceHeadlines } from "./lib/headlines";

function renderMods(): void {
  const grid = document.querySelector<HTMLElement>("#mods-grid");
  if (!grid) return;
  grid.innerHTML = mods
    .map(
      (m) => `
      <div class="card${m.flag ? " flag" : ""}">
        ${m.badge ? `<div><span class="badge">${m.badge}</span></div>` : ""}
        <h4>${m.name}</h4>
        <p>${m.blurb}</p>
        <div class="meta">${m.meta}</div>
      </div>`,
    )
    .join("");
}

function main(): void {
  const themeBtn = document.querySelector<HTMLElement>("#themeBtn");
  if (themeBtn) initTheme(themeBtn);

  renderMods();

  const rsvpEl = document.querySelector<HTMLElement>("#rsvp");
  const slot = document.querySelector<HTMLElement>("#rsvpSlot");
  if (rsvpEl && slot) {
    const rsvp = createRsvp(rsvpEl, STORY);
    initHighlight(rsvp, rsvpEl);
    initDock(rsvpEl, slot);
  }

  balanceHeadlines(".balance");
}

main();
