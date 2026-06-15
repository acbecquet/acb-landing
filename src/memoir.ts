import "./styles/tokens.css";
import "./styles/styles.css";

import { initTheme } from "./lib/theme";
import { initNav } from "./lib/nav";
import { balanceHeadlines } from "./lib/headlines";

initNav();

const themeBtn = document.querySelector<HTMLElement>("#themeBtn");
if (themeBtn) initTheme(themeBtn);

balanceHeadlines(".balance");
