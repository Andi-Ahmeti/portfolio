const root = document.documentElement;
const toggle = document.querySelector("[data-theme-toggle]");
const year = document.querySelector("[data-year]");

function readStoredTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (e) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    /* storage unavailable; theme still applies for this visit */
  }
}

const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const initial = readStoredTheme() || (prefersLight ? "light" : "dark");

function applyTheme(theme) {
  root.dataset.theme = theme;
  saveTheme(theme);
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

/* Pristina clock */
const headerClock = document.getElementById("header-clock");
const heroClock = document.getElementById("hero-clock");

function formatTime(withSeconds) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Belgrade",
    hour: "2-digit",
    minute: "2-digit",
    ...(withSeconds ? { second: "2-digit" } : {}),
    hour12: false,
  }).format(new Date());
}

function tick() {
  if (headerClock) headerClock.textContent = formatTime(false);
  if (heroClock) heroClock.textContent = formatTime(true);
}

tick();
setInterval(tick, 1000);

/* Highlight the current section in the side index */
const railLinks = document.querySelectorAll("#section-nav a[data-target]");
const sections = Array.from(railLinks)
  .map((link) => document.getElementById(link.dataset.target))
  .filter(Boolean);

function setActive(id) {
  railLinks.forEach((link) => {
    if (link.dataset.target === id) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-25% 0px -65% 0px" }
  );
  sections.forEach((section) => observer.observe(section));
}
