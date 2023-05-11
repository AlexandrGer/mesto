import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, enableValidation } from './utils.js';

// Кнопки
const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddNewCard = document.querySelector('.profile__button-add');

// Переменные из секции Профиль
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

//====
// const cardTemplate = document.querySelector('#cards-element');
const cardList = document.querySelector('.elements__items');

//Переменные из Попапа Редактирования Пофиля
const popupProfile = document.querySelector('.popup_type_edit');
const formElementProfile = popupProfile.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_job');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');

//Переменные из Попапа Добавления Карточек
const popupNewCard = document.querySelector('.popup_type_new-card');
const formElementNewCard = popupNewCard.querySelector('.popup__form');
const nameImage = popupNewCard.querySelector('.popup__input_type_title');
const srcImage = popupNewCard.querySelector('.popup__input_type_src');
const buttonClosePopupNewCard = popupNewCard.querySelector('.popup__button-close');

//Переменные для попапа карточки
const popupSerchCard = document.querySelector('.popup_type_view-img');
const nameCard = popupSerchCard.querySelector('.popup__caption');
const srcCard = popupSerchCard.querySelector('.popup__img');
const buttonClosePopupSerchCard = popupSerchCard.querySelector('.popup__button-close');

// Функция открытия Попапа
const openPopup = (popup) => {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', keyHandler);
	mouseHandler();
}

// Функция закрытия Попапа
const closePopup = (popup) => {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', keyHandler);
}

// Функция закрытия Попапа на Escape
const keyHandler = (evt) => {
	if (evt.key === 'Escape') {
		closePopup(document.querySelector('.popup_opened'));
	}
}

const disabledButton = (popup) => {
	const buttonSubmit = popup.querySelector('.popup__button-submit');
	buttonSubmit.classList.add('popup__button-submit_disabled');
	buttonSubmit.setAttribute('disabled', true);
}

const deleteError = (popup) => {
	const inputs = Array.from(popup.querySelectorAll('.popup__input'));
	const errors = Array.from(popup.querySelectorAll('.popup__input-error'));
	inputs.forEach((input, error) => {
		input.classList.remove('popup__input_text_error');
	});
	errors.forEach((error) => {
		error.classList.remove('popup__input-error_visible');
		error.textContent = '';
	})
}

// Функция закрытия Попапа щелчком по оверлею
const mouseHandler = () => {
	const popups = Array.from(document.querySelectorAll('.popup'));
	popups.forEach((popupElement) => {
		popupElement.addEventListener('click', function (evt) {
			if (evt.target.classList.contains('popup')) {
				evt.target.classList.remove('popup_opened');
			}
		})
	})
}

// Функция которая при открытии заполняет Форму данными из Профиля
const handleEditProfileClick = () => {
	openPopup(popupProfile);
	disabledButton(popupProfile);
	deleteError(popupProfile);
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
	disabledButton(popupNewCard);
});

buttonClosePopupNewCard.addEventListener('click', () => {
	closePopup(popupNewCard);
});

const viewPicture = (image) => {
	openPopup(popupSerchCard);
	nameCard.textContent = image.name;
	srcCard.src = image.link;
	srcCard.alt = image.name;
}

const createCard = (data) => {
	const card = new Card(data, '#cards-element', viewPicture);
	return card.generateCard();
}

initialCards.forEach((item) => {
	const defaultCard = createCard(item);
	cardList.append(defaultCard);
})

const handleNewCardFormSubmit = (evt) => {
	evt.preventDefault();

	const newCard = {
		name: nameImage.value,
		link: srcImage.value
	}

	cardList.prepend(createCard(newCard));
	formElementNewCard.reset();
	closePopup(popupNewCard);
};

formElementNewCard.addEventListener('submit', handleNewCardFormSubmit);

buttonClosePopupSerchCard.addEventListener('click', () => {
	closePopup(popupSerchCard);
})

const profileValidator = new FormValidator(enableValidation, formElementProfile);
profileValidator.enableValidation();

const cardValidator = new FormValidator(enableValidation, formElementNewCard);
cardValidator.enableValidation();