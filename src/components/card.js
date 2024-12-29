const cardTemplate = document.querySelector("#card-template").content;

export function createCard(item, onDeleteCard, handLike, openImage) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  deleteButton.addEventListener("click", onDeleteCard);
  likeButton.addEventListener("click", () => handLike(likeButton));
  cardImage.addEventListener("click", () => openImage(item.link, item.name));

  return cardElement;
}

export function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

export function handLike(button) {
  button.classList.toggle("card__like-button_is-active");
}
