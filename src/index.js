import "../src/pages/index.css";
import { initialCards } from "./cards";
import { createCard, deleteCard, handLike } from "./components/card";
import { closeModal, openModal } from "./components/modal";

// @todo: DOM узлы
const container = document.querySelector(".content");
const cardsContainer = container.querySelector(".places__list");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup__image");
const popupPreviewImage = document.querySelector(".popup_type_image");
const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");
const popupClose = document.querySelectorAll(".popup__close");
const inputTypeName = document.querySelector(".popup__input_type_name");
const popupInputTypeDescription = document.querySelector(".popup__input_type_description");
const editPopupForm = document.forms["edit-profile"];
const newPopupPlaceForm = document.forms["new-place"];
const popupCaption = document.querySelector(".popup__caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

popupClose.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closeModal(popup);
  });
});

editProfileButton.addEventListener("click", () => {
  inputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

addProfileButton.addEventListener("click", () => openModal(popupNewCard));

function openImage(src, alt) {
  popupImage.src = src;
  popupImage.alt = alt;
  popupCaption.textContent = alt;
  openModal(popupPreviewImage);
}

editPopupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = inputTypeName.value;
  profileDescription.textContent = popupInputTypeDescription.value;
  closeModal(popupEditProfile);
});

newPopupPlaceForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const placeName = newPopupPlaceForm["place-name"].value;
  const placeLink = newPopupPlaceForm["link"].value;
  const newCard = createCard(
    { name: placeName, link: placeLink },
    deleteCard,
    handLike,
    openImage
  );
  cardsContainer.prepend(newCard);
  closeModal(popupNewCard);
  newPopupPlaceForm.reset();
});

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  const itemCard = createCard(item, deleteCard, handLike, openImage);
  cardsContainer.append(itemCard);
});
