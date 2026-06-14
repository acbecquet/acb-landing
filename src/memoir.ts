import "./styles/tokens.css";
import "./styles/styles.css";

import { initTheme } from "./lib/theme";
import { balanceHeadlines } from "./lib/headlines";

const themeBtn = document.querySelector<HTMLElement>("#themeBtn");
if (themeBtn) initTheme(themeBtn);

balanceHeadlines(".balance");
