const root = document.documentElement;
const toggle = document.querySelector("[data-theme-toggle]");
const year = document.querySelector("[data-year]");

const stored = localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const initial = stored || (prefersLight ? "light" : "dark");

function applyTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  if (toggle) {
    toggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
  }
}

applyTheme(initial);

toggle?.addEventListener("click", () => {
  applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

if (year) {
  year.textContent = String(new Date().getFullYear());
}
