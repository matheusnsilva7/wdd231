const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("site-nav");

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  console.log(siteNav)
  siteNav.classList.toggle("open");
  navToggle.textContent = !expanded ? "X" : "☰";
});

siteNav.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("open");
      navToggle.textContent = "☰";
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("open");
    navToggle.textContent = "☰";
  }
});
