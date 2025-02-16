//import { deleteCard, putLikeCard, delDislikeCard } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  cardData,
  cbDelCard,
  cbLikeCard,
  cbShowImage,
  userID
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  likeCounter.textContent = cardData.likes.length;

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  isMyCard(cardData.owner._id, userID)
    ? deleteButton.addEventListener("click", () => {
        cbDelCard(cardData, cardElement);
      })
    : deleteButton.remove();

  hasLikeCard(cardData.likes, userID) &&
    likeButton.classList.toggle("card__like-button_is-active");

  likeButton.addEventListener("click", () => {
    cbLikeCard(cardData, likeButton, likeCounter);
  });

  cardImage.addEventListener("click", () => {
    cbShowImage(cardData);
  });

  return cardElement;
}

function isMyCard(cardOwn, id) {
  return cardOwn === id;
}

function hasLikeCard(likes, id) {
  return likes.some((card) => card._id === id);
}
