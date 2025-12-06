import { fetchSports } from "./api.js";

const pre = document.getElementById("formDataPre");
const sportsGrid = document.querySelector("#sportsGrid");
const searchInput = document.querySelector("#searchInput");
const filterSelect = document.querySelector("#filterSelect");
const detailModal = document.querySelector("#detailModal");
const detailContent = document.querySelector("#detailContent");
const favoritesBtn = document.querySelector("#openFavoritesBtn");
const favoritesModal = document.querySelector("#favoritesModal");
const favoritesContent = document.querySelector("#favoritesContent");
const featuredContainer = document.querySelector("#featuredContainer");

const state = {
  sports: [],
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(state.favorites));
}

function renderFeatured(container, items) {
  container.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "sport-card";
    card.innerHTML = `
      <div class="card-body">
        <h3>${item.name}</h3>
        <p class="muted">${item.format}</p>
        <p><strong>Popularity:</strong> ${item.popularity}</p>
        <p>
          <button data-id="${item.id}" class="btn view-detail">View</button>
          <button data-id="${item.id}" class="btn fav-btn">
            ${state.favorites.includes(item.id) ? "Remove" : "Favorite"}
          </button>
        </p>
      </div>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll(".view-detail").forEach((btn) => {
    btn.addEventListener("click", (e) => openDetailModal(e.target.dataset.id));
  });

  container.querySelectorAll(".fav-btn").forEach((btn) => {
    btn.addEventListener("click", (e) =>
      toggleFavorite(e.target.dataset.id, e.target)
    );
  });
}

function renderSportsGrid(container, items) {
  container.innerHTML = "";
  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "sport-card";
    article.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p><strong>Format:</strong> ${item.format}</p>
        <p><strong>Popularity:</strong> ${item.popularity}</p>
        <p class="muted">${truncate(item.description, 160)}</p>
        <p>
          <button class="btn view-detail" data-id="${item.id}">Details</button>
          <button class="btn fav-btn" data-id="${item.id}">
            ${state.favorites.includes(item.id) ? "Remove" : "Favorite"}
          </button>
        </p>
      </div>
    `;
    container.appendChild(article);
  });

  container
    .querySelectorAll(".view-detail")
    .forEach((btn) =>
      btn.addEventListener("click", (e) => openDetailModal(e.target.dataset.id))
    );

  container
    .querySelectorAll(".fav-btn")
    .forEach((btn) =>
      btn.addEventListener("click", (e) =>
        toggleFavorite(e.target.dataset.id, e.target)
      )
    );
}

function setupSearchFilter() {
  if (!searchInput || !sportsGrid) return;

  const applyFilters = () => {
    const searchQuery = (searchInput.value || "").trim().toLowerCase();
    const selectedFormat = (filterSelect?.value || "").trim().toLowerCase();

    const filteredSports = state.sports.filter((sport) => {
      const matchesName = sport.name.toLowerCase().includes(searchQuery);
      const matchesDescription = (sport.description || "")
        .toLowerCase()
        .includes(searchQuery);

      const matchesFormat =
        !selectedFormat ||
        (sport.format &&
          sport.format.toLowerCase().includes(selectedFormat));

      return (matchesName || matchesDescription) && matchesFormat;
    });

    renderSportsGrid(sportsGrid, filteredSports);
  };

  searchInput.addEventListener("input", debounce(applyFilters, 220));
  filterSelect?.addEventListener("change", applyFilters);
}

function openDetailModal(id) {
  const sport = state.sports.find((s) => s.id == id);
  if (!sport) return;
  detailContent.innerHTML = `
    <h2>${sport.name}</h2>
    <p><strong>Format:</strong> ${sport.format}</p>
    <p><strong>Popularity:</strong> ${sport.popularity}</p>
    <p>${sport.description}</p>
    <p>
      <button class="btn fav-btn" data-id="${sport.id}">
        ${
          state.favorites.includes(sport.id)
            ? "Remove favorite"
            : "Add to favorites"
        }
      </button>
    </p>
  `;

  detailContent.querySelector(".fav-btn").addEventListener("click", (e) => {
    toggleFavorite(e.target.dataset.id, e.target);
  });

  showModal(detailModal);
}

function toggleFavorite(id) {
  const idx = state.favorites.indexOf(id);
  if (idx >= 0) state.favorites.splice(idx, 1);
  else state.favorites.push(id);

  saveFavorites();
  renderFavoritesContent();

  document.querySelectorAll(`[data-id="${id}"].fav-btn`).forEach((b) => {
    b.textContent = state.favorites.includes(id) ? "Remove" : "Favorite";
  });
}

function renderFavoritesContent() {
  if (!favoritesContent) return;

  if (!state.favorites.length) {
    favoritesContent.innerHTML =
      '<p>No favorites yet. Click "Favorite" on any sport to save it here.</p>';
    return;
  }

  const list = state.favorites
    .map((id) => state.sports.find((s) => s.id == id))
    .filter(Boolean);

  favoritesContent.innerHTML = `
    <ul>
      ${list
        .map((s) => `<li><strong>${s.name}</strong> — ${s.format}</li>`)
        .join("")}
    </ul>
    <p><button class="btn" id="clearFavs">Clear favorites</button></p>
  `;

  document.querySelector("#clearFavs").addEventListener("click", () => {
    state.favorites = [];
    saveFavorites();
    renderFavoritesContent();

    document
      .querySelectorAll(".fav-btn")
      .forEach((b) => (b.textContent = "Favorite"));
  });
}

function setupNavToggles() {
  document.querySelectorAll(".nav-toggle").forEach((btn) => {
    const nav = btn.nextElementSibling;
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !expanded);
      if (nav) nav.classList.toggle("show");
    });
  });
}

function setupModals() {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]") || e.target.closest(".modal-close")) {
      const modal = e.target.closest(".modal");
      if (modal) closeModal(modal);
    }
  });
}

function showModal(modal) {
  modal.setAttribute("aria-hidden", "false");
  const focusable = modal.querySelector(
    "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
  );
  if (focusable) focusable.focus();
}

function closeModal(modal) {
  modal.setAttribute("aria-hidden", "true");
}

function truncate(str, n = 140) {
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  setupNavToggles();
  setupModals();
  if (favoritesBtn)
    favoritesBtn.addEventListener("click", () => {
      renderFavoritesContent();
      showModal(favoritesModal);
    });

  const sports = await fetchSports();
  state.sports = sports;

  if (featuredContainer)
    renderFeatured(featuredContainer, state.sports.slice(0, 6));

  if (sportsGrid) {
    renderSportsGrid(sportsGrid, state.sports);
    setupSearchFilter();
  }

  if (pre) {
    const params = new URLSearchParams(window.location.search || "");
    if (!params.toString()) {
      pre.textContent = "No query string found.";
    } else {
      const obj = {};
      for (const [k, v] of params.entries()) obj[k] = v;
      pre.textContent = JSON.stringify(obj, null, 2);
    }
  }
});
