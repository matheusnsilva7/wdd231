// Fetch and Display Members
const directory = document.querySelector("#directory");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data.members);
  } catch (err) {
    console.error("Error fetching members:", err);
  }
}

function displayMembers(members) {
  directory.innerHTML = "";
  members.forEach((member) => {
    const card = document.createElement("section");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${
      member.name
    } logo" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
      <p class="level">Membership: ${
        ["Member", "Silver", "Gold"][member.membershipLevel - 1]
      }</p>
    `;
    directory.appendChild(card);
  });
}

// Toggle Grid/List View
const gridBtn = document.querySelector("#gridView");
const listBtn = document.querySelector("#listView");

gridBtn.addEventListener("click", () =>
  directory.classList.replace("list", "grid")
);
listBtn.addEventListener("click", () =>
  directory.classList.replace("grid", "list")
);
getMembers();
