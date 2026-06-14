// Light / dark toggle. The no-flash initial theme is set by an inline script in the
// document <head>; this just wires the toggle button and persists the choice.

export function initTheme(btn: HTMLElement): void {
  const root = document.documentElement;
  const syncIcon = (): void => {
    btn.textContent = root.getAttribute("data-theme") === "dark" ? "☀" : "◐";
  };
  syncIcon();
  btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("acb-theme", next);
    } catch {
      /* storage unavailable — ignore */
    }
    syncIcon();
  });
}
