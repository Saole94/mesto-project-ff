import "./index.css";
import { createCard } from "./components/card";
import { closeModal, openModal } from "./components/modal.js";
import * as api from "./components/api.js";
import {
  clearValidation,
  enableValidation,
} from "./components/validation.js";

// @todo: DOM узлы
const container = document.querySelector(".content");
const popupEditElement = document.querySelector(".popup__form");
const avatarImage = document.querySelector(".profile__image");
const avatarNewType = document.querySelector(".popup_type_new-avatar");
const avatarCardForm = avatarNewType.querySelector(".popup__form");
const buttonSubmitProfile = document.querySelector(
  ".popup__button_profile-avatar"
);
const cardsContainer = container.querySelector(".places__list");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const newCardForm = popupNewCard.querySelector(".popup__form");
const popupImage = document.querySelector(".popup__image");
const popupPreviewImage = document.querySelector(".popup_type_image");
const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");
const popupClose = document.querySelectorAll(".popup__close");
const formPlace = document.querySelector(".popup__form_place");
const inputProfileImage = document.querySelector(".popup__input_type_image");
const inputTypeName = popupEditElement.querySelector(".popup__input_type_name");
const inputTypeUrl = formPlace.querySelector(".popup__input_type_url");
const popupInputTypeDescription = document.querySelector(
  ".popup__input_type_description"
);
//const editPopupForm = document.forms["edit-profile"];
const formEditProfile = document.querySelector(".popup__form_edit_profile");
const buttonEditProfile = formEditProfile.querySelector(
  ".popup__button_edit_profile"
);
const buttonFormPlace = formPlace.querySelector(".popup__button_place");
const inputAddCardName = formPlace.querySelector(
  ".popup__input_type_card-name"
);
//const newPopupPlaceForm = document.forms["new-place"];
const popupCaption = document.querySelector(".popup__caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const validationParams = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

popupClose.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closeModal(popup);
  });
});

editProfileButton.addEventListener("click", () => {
  inputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
  clearValidation(formEditProfile, buttonEditProfile, enableValidation);
  openModal(popupEditProfile);
});

addProfileButton.addEventListener("click", () => {
  clearValidation(formPlace, buttonFormPlace, enableValidation);
  openModal(popupNewCard);
});

avatarImage.addEventListener("click", () => {
  //clearValidation(avatarNewType, buttonSubmitProfile, enableValidation);
  openModal(avatarNewType);
});

function deleteCard(cardData, cardElement) {
  api
    .deleteCard(cardData._id)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.log(error);
    });
}

function likeCard(cardData, likeButton, likeCounter) {
  const likeMethod = likeButton.classList.contains(
    "card__like-button_is-active"
  )
    ? api.delLikeCard
    : api.addLikeCard;

  likeMethod(cardData._id).then((cardData) => {
    likeButton.classList.toggle("card__like-button_is-active");
    likeCounter.textContent = cardData.likes.length;
  });
}

function showCard(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupPreviewImage);
}

Promise.all([api.getProfileData(), api.getCards()])
  .then(([userData, cardData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatarImage.style.backgroundImage = `url(${userData.avatar})`;

    cardData.forEach((item) => {
      const itemCard = createCard(
        item,
        deleteCard,
        likeCard,
        showCard,
        userData._id
      );
      cardsContainer.append(itemCard);
    });
  })
  .catch((err) => {
    console.log(
      `Ошибка. Не получилось записать информацию о 
      пользователе страницы, либо отобразить карточки: ${err}`
    );
  });

function editFormSubmit(evt) {
  evt.preventDefault();
  const textOnSubmitButton = buttonEditProfile.textContent;
  buttonEditProfile.textContent = "Сохранение ...";
  api.editProfile(inputTypeName.value, popupInputTypeDescription.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.error(`Ошибка. Возможно не получилось загрузить 
        данные пользователя в профиль: ${err}`);
    })
    .finally(() => (buttonEditProfile.textContent = textOnSubmitButton));
}

popupEditElement.addEventListener("submit", editFormSubmit);

function addCardSubmit(evt) {
  evt.preventDefault();
  const textOnSubmitButton = buttonFormPlace.textContent;
  buttonFormPlace.textContent = "Сохранение ...";
  
  api.addCard(inputAddCardName.value, inputTypeUrl.value)
    .then((card) => {
      const newCardElement = createCard(
        card,
        deleteCard,
        likeCard,
        showCard,
        card.owner._id
      );
      cardsContainer.prepend(newCardElement);
      closeModal(popupNewCard);
      newCardForm.reset();
    })
    .catch((err) => {
      console.log(`Ошибка. Возможно не получилось загрузить
      карточку: ${err}`);
    })
    .finally(() => (buttonFormPlace.textContent = textOnSubmitButton));
}

function avatarFormSubmit(evt) {
  evt.preventDefault();
  const textOnSubmitButton = buttonSubmitProfile.textContent;
  buttonSubmitProfile.textContent = "Сохранение ...";
  api.changeAvatar(inputProfileImage.value)
    .then((card) => {
      avatarImage.style.backgroundImage = `url(${card.avatar})`;
      closeModal(avatarNewType);
      avatarCardForm.reset();
    })
    .catch((err) => {
      console.error(`Ошибка. Возможно не получилось загрузить 
        аватар в профиль: ${err}`);
    })
    .finally(() => (buttonSubmitProfile.textContent = textOnSubmitButton));
}

newCardForm.addEventListener("submit", addCardSubmit);
avatarCardForm.addEventListener("submit", avatarFormSubmit);

enableValidation(validationParams);
