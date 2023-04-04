// Попап
const popup = document.querySelector('.popup');

// Кнопки
const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddNewCard = document.querySelector('.profile__button-add');

// Переменные из секции Профиль
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

//====
const cardTemplate = document.querySelector('#cards-element');
const cardList = document.querySelector('.elements__items');

//Переменные из Попапа Редактирования Пофиля
const popupProfile = document.querySelector('.popup_type_edit');
const formElementProfile = popupProfile.querySelector('.form');
const nameInput = popupProfile.querySelector('.popup__text_type_name');
const jobInput = popupProfile.querySelector('.popup__text_type_job');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');

//Переменные из Попапа Добавления Карточек
const popupNewCard = document.querySelector('.popup_type_new-card');
const formElementNewCard = popupNewCard.querySelector('.form');
const nameImage = popupNewCard.querySelector('.popup__text_type_title');
const srcImage = popupNewCard.querySelector('.popup__text_type_src');
const buttonClosePopupNewCard = popupNewCard.querySelector('.popup__button-close');

//Переменные для попапа карточки
const popupSerchCard = document.querySelector('.popup_type_view-img');
const nameCard = popupSerchCard.querySelector('.popup__caption');
const srcCard = popupSerchCard.querySelector('.popup__img');
const buttonClosePopupSerchCard = popupSerchCard.querySelector('.popup__button-close');

// Функция открытия Попапа
const openPopup = (popup) => {
	popup.classList.add('popup_opened');
}

// Функция закрытия Попапа
const closePopup = (popup) => {
	popup.classList.remove('popup_opened');
}

// Функция которая при открытии заполняет Форму данными из Профиля
const handleEditProfileClick = () => {
	openPopup(popupProfile);
	nameInput.value = nameProfile.textContent;
	jobInput.value = jobProfile.textContent;
}

buttonEditProfile.addEventListener('click', handleEditProfileClick);
buttonClosePopupProfile.addEventListener('click', () => {
	closePopup(popupProfile);
});

// Функция сохраняющая введенные пользователем данные в Профиль
const handleProfileFormSubmit = (evt) => {
	evt.preventDefault();
	nameProfile.textContent = nameInput.value;
	jobProfile.textContent = jobInput.value;
	closePopup(popupProfile);
}

formElementProfile.addEventListener('submit', handleProfileFormSubmit);

//============================

buttonAddNewCard.addEventListener('click', () => {
	openPopup(popupNewCard);
});
buttonClosePopupNewCard.addEventListener('click', () => {
	closePopup(popupNewCard);
});

const createCardElement = (cardData) => {
	const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
	const cardName = cardElement.querySelector('.element__title');
	const cardImage = cardElement.querySelector('.element__image');

	cardName.textContent = cardData.name;
	cardImage.src = cardData.link;
	cardImage.alt = cardData.name;

	const buttonLike = cardElement.querySelector('.element__button-like');
	const buttonDelete = cardElement.querySelector('.element__button-delete');

	const handleDelete = () => {
		cardElement.remove();
	};

	const handleLike = () => {
		buttonLike.classList.toggle('element__button-like_active');
	};

	buttonLike.addEventListener('click', handleLike);
	buttonDelete.addEventListener('click', handleDelete);

	cardImage.addEventListener('click', () => {
		openPopup(popupSerchCard);
		nameCard.textContent = cardName.textContent;
		srcCard.src = cardImage.src;
		srcCard.alt = cardName.textContent;
	});

	return cardElement;
};

buttonClosePopupSerchCard.addEventListener('click', () => {
	closePopup(popupSerchCard);
})

const renderCardElement = (cardElement) => {
	cardList.append(cardElement);
};

initialCards.forEach((element) => {
	renderCardElement(createCardElement(element));
});

const handleNewCardFormSubmit = (evt) => {
	evt.preventDefault();

	const newCard = {
		name: nameImage.value,
		link: srcImage.value
	}

	cardList.prepend(createCardElement(newCard));
	formElementNewCard.reset();
	closePopup(popupNewCard);
};

formElementNewCard.addEventListener('submit', handleNewCardFormSubmit);