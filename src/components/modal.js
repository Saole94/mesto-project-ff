export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleKeyPress);
  popup.addEventListener("mousedown", handleClick);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleKeyPress);
  popup.removeEventListener("mousedown", handleClick);
}

function handleKeyPress(evt) {
  if (evt.key === "Escape") {
    const modalClose = document.querySelector(".popup_is-opened");
    if (modalClose) {
      closeModal(modalClose);
    }
  }
}
function handleClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}
