const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");
const toggleLabel = document.getElementById("theme-label");
const clock = document.getElementById("pristina-clock");
const year = document.getElementById("current-year");

/* Theme */
function saveTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    /* storage unavailable; theme still applies for this visit */
  }
}

function syncToggle(theme) {
  const next = theme === "dark" ? "light" : "dark";
  if (toggleLabel) toggleLabel.textContent = next === "dark" ? "Dark" : "Light";
  if (toggle) toggle.setAttribute("aria-label", "Switch to " + next + " theme");
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  saveTheme(theme);
  syncToggle(theme);
}

syncToggle(root.getAttribute("data-theme") || "light");

toggle?.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  applyTheme(current === "dark" ? "light" : "dark");
});

/* Pristina local time (same zone as Europe/Pristina) */
function updateClock() {
  if (!clock) return;
  try {
    clock.textContent = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Belgrade",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch (e) {
    clock.textContent = "";
  }
}

updateClock();
setInterval(updateClock, 15000);

/* Footer year */
if (year) {
  year.textContent = String(new Date().getFullYear());
}
