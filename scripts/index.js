// @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
    const container = document.querySelector('.content');
    const cardContainer = container.querySelector('.places__list');


// @todo: Функция создания карточки
    function createCard(item, onDeleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    deleteButton.addEventListener('click', onDeleteCard);

    return cardElement
    }

// @todo: Функция удаления карточки
    function deleteCard(evt){
    evt.target.closest('.places__item').remove();
}


// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    const itemCard = createCard(item, deleteCard);
    cardContainer.append(itemCard);
   });