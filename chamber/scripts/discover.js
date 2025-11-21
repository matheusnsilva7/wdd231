import items from "../data/activities.mjs";
const messageBox = document.querySelector("#visitMessage");
const container = document.querySelector(".discover-grid");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

items.forEach((item) => {
  const card = document.createElement("section");
  card.classList.add("discover-card");

  const title = document.createElement("h2");
  title.textContent = item.name;

  const img = document.createElement("img");
  img.src = item["source_photo_url"];
  img.alt = item.name;
  img.width = 300;
  img.height = 200;
  img.loading = "lazy"

  const address = document.createElement("address");
  address.textContent = item.address;

  const desc = document.createElement("p");
  desc.textContent = item.description;

  const button = document.createElement("button");
  button.textContent = "Learn More";

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(address);
  card.appendChild(desc);
  card.appendChild(button);

  container.appendChild(card);
});

if (!lastVisit) {
  messageBox.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const diff = now - Number(lastVisit);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days < 1) {
    messageBox.textContent = "Back so soon! Awesome!";
  } else if (days === 1) {
    messageBox.textContent = "You last visited 1 day ago.";
  } else {
    messageBox.textContent = `You last visited ${days} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);
