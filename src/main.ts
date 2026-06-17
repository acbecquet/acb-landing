import "./styles/tokens.css";
import "./styles/styles.css";

import { inject } from "@vercel/analytics";

import { story } from "./content";
import { createRsvp } from "./lib/rsvp";
import { initHighlight } from "./lib/highlight";
import { initDock } from "./lib/dock";
import { initTheme } from "./lib/theme";
import { initNav } from "./lib/nav";
import { balanceHeadlines } from "./lib/headlines";

function main(): void {
  inject(); // Vercel Web Analytics
  initNav();

  const themeBtn = document.querySelector<HTMLElement>("#themeBtn");
  if (themeBtn) initTheme(themeBtn);

  const rsvpEl = document.querySelector<HTMLElement>("#rsvp");
  const slot = document.querySelector<HTMLElement>("#rsvpSlot");
  if (rsvpEl && slot) {
    const rsvp = createRsvp(rsvpEl, story);
    initHighlight(rsvp, rsvpEl);
    initDock(rsvpEl, slot);
  }

  balanceHeadlines(".balance");
}

main();
