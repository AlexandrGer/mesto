import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage';
import { Section } from '../components/Section';
import {
	initialCards, // массив с карточками
	validationConfig, // валидация форм
	formElementProfile, // форма Профиля
	formElementNewCard, // форма Создания карточки
	cardList, // контейнер для вставки карточек
	popupProfile, // попап Редактирования Профиля
	popupNewCard, // попап Добавления Карточки
	popupSerchCard, // попап Просмотра Картинки
	buttonEditProfile, // кнопка Редактирования Профиля
	buttonAddNewCard, // кнопка Добавления Карточки
	nameProfile, // Имя Пользователя
	jobProfile, // Информация о Пользователе
	nameInput, // Поле формы (имя)
	jobInput, // Поле формы (информация о пользователе)

} from '../utils/constants.js';

// Функция создания карточки и передача ее в Попап просмотра Картинки
const createCard = (cardItem) => {
	const card = new Card({
		data: cardItem,
		handleCardClick: () => {
			popupSerchImage.openPopup(cardItem);
		}
	},
		'#cards-element')
	return card.generateCard();
}

// Создание класса Валидации Формы редактирования Профиля
const profileValidator = new FormValidator(validationConfig, formElementProfile);

// Создание класса Валидации Формы создания Карточки
const cardValidator = new FormValidator(validationConfig, formElementNewCard);

// Создание класса Секция для Добавления карточек из массива на страницу
const cardsList = new Section({
	items: initialCards,
	renderer: (cardItem) => {
		cardsList.addItem(createCard(cardItem));
	}
},
	cardList);
cardsList.renderItems();

// Создание класса Попапа просмотра Картинки
const popupSerchImage = new PopupWithImage(popupSerchCard);

// Создание класса Информации о Пользователе
const userInfo = new UserInfo({
	userNameSelector: nameProfile,
	userDescriptionSelector: jobProfile
})

// Создание класса Попапа редактирования Профиля
const popupEditProfile = new PopupWithForm({
	popupSelector: popupProfile,
	handleFormSubmit: (data) => {
		userInfo.setUserInfo({
			userName: data.profileName,
			userDescription: data.profileJob
		});
		popupEditProfile.closePopup();
	}
})

// Создание класса Попапа добавления Карточки
const popupAddCard = new PopupWithForm({
	popupSelector: popupNewCard,
	handleFormSubmit: (data) => {
		const newCard = {
			name: data.imageName,
			link: data.imageLink
		}
		cardsList.addNewItem(createCard(newCard));
		popupAddCard.closePopup();
	}
})

// Слушатель на кнопку Редактирования Профиля
buttonEditProfile.addEventListener('click', () => {
	popupEditProfile.openPopup();
	profileValidator.deleteErrors();
	const user = userInfo.getUserInfo();
	nameInput.value = user.name;
	jobInput.value = user.description;
})

// Слушатель на кнопку Добавления Карточки
buttonAddNewCard.addEventListener('click', () => {
	popupAddCard.openPopup();
	cardValidator.toggleButtonState();
	cardValidator.deleteErrors();
})

//=====================================
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupSerchImage.setEventListeners();

//=====================================
profileValidator.enableValidation();
cardValidator.enableValidation();