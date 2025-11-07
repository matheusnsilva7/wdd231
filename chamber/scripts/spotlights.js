const container = document.querySelector(".spotlight-container");

async function loadSpotlights() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  const members = data.members.filter(
    (m) => m.membershipLevel === 3 || m.membershipLevel === 2
  );

  const random = members.sort(() => 0.5 - Math.random()).slice(0, 3);
  container.innerHTML = "";

  random.forEach((m) => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");
    card.innerHTML = `
      <img src="images/${m.image}" alt="${m.name}" width="100" />
      <h3>${m.name}</h3>
      <p>${m.address}</p>
      <p>📞 ${m.phone}</p>
      <p><a href="${m.website}" target="_blank">${m.website}</a></p>
      <p><strong>${
        ["Member", "Silver", "Gold"][m.membershipLevel - 1]
      }</strong> Member</p>
    `;
    container.appendChild(card);
  });
}
loadSpotlights();
