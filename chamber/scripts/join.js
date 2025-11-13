document.getElementById("timestamp").value = new Date().toISOString();

const openButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".modal-close");

openButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = document.getElementById(btn.dataset.modal);
    modal.showModal();
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest("dialog").close();
  });
});
