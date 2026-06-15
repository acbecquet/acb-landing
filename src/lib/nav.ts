// Mobile nav: the hamburger toggles the link menu; it closes on a link tap or an outside click.
export function initNav(): void {
  const nav = document.querySelector<HTMLElement>("header.nav");
  const btn = document.querySelector<HTMLButtonElement>("#menuBtn");
  const menu = document.querySelector<HTMLElement>("#navMenu");
  if (!nav || !btn || !menu) return;

  const setOpen = (open: boolean): void => {
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!nav.classList.contains("open"));
  });
  menu.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest("a")) setOpen(false);
  });
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("open") && !nav.contains(e.target as Node)) setOpen(false);
  });
}
