import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithDelete } from '../components/PopupWithDelete';
import { Section } from '../components/Section';
import { Api } from '../components/Api';
import {
	initialCards, // массив с карточками
	validationConfig, // валидация форм
	formElementProfile, // форма Профиля
	formElementNewCard, // форма Создания карточки
	formElementAvatar, // форма Аватара
	cardList, // контейнер для вставки карточек
	popupProfile, // попап Редактирования Профиля
	popupNewCard, // попап Добавления Карточки
	popupAvatar, // попап Редактирования Аватара
	popupSerchCard, // попап Просмотра Картинки
	buttonEditProfile, // кнопка Редактирования Профиля
	buttonAddNewCard, // кнопка Добавления Карточки
	buttonEditAvatar, // кнопка Смены Аватара
	nameProfile, // Имя Пользователя
	jobProfile, // Информация о Пользователе
	avatarProfile, // Аватар Пользователя
	nameInput, // Поле формы (имя)
	jobInput, // Поле формы (информация о пользователе)
	avatarInput, // Поле формы аватара
	popupDelete,

} from '../utils/constants.js';

const api = new Api({
	url: 'https://mesto.nomoreparties.co/v1/cohort-68/',
	headers: {
		authorization: '3c161b6c-5a5d-4642-af7d-6f12393d02c0',
		'Content-Type': 'application/json'
	}
})

let userId;

Promise.all([api.getCards(), api.getUserData()]).then(([cardsArray, userProfileInfo]) => {
	userId = userProfileInfo._id;
}).catch((err) => console.log(`Возникла ошибка: ${err}`))

// Функция создания карточки и передача ее в Попап просмотра Картинки
const createCard = (cardItem) => {
	const card = new Card({
		data: cardItem,
		handleCardClick: () => {
			popupSerchImage.open(cardItem);
		},
		handleCardDelete: () => {
			popupDeleteCard.open(card);
		}
	},
		userId,
		'#cards-element')
	return card.generateCard();
}



// Создание класса Секция для Добавления карточек из массива на страницу
const cardsList = new Section({
	renderer: (cardItem) => {
		cardsList.addItem(createCard(cardItem));
	}
},
	cardList);

api.getCards().then((cards) => {
	cardsList.renderItems(cards);
}).catch((err) => console.log(`При загрузке карточек с сервера возникла ошибка: ${err}`));


// Создание класса Попапа просмотра Картинки
const popupSerchImage = new PopupWithImage(popupSerchCard);

const popupDeleteCard = new PopupWithDelete({
	popupElement: popupDelete,
	cardDelete: (cardId) => {
		api.deleteCard(cardId)
	}
})

// Создание класса Информации о Пользователе
const userInfo = new UserInfo({
	userNameSelector: nameProfile,
	userDescriptionSelector: jobProfile,
	userAvatarSelector: avatarProfile
})

// Создание класса Попапа редактирования Профиля
const popupEditProfile = new PopupWithForm({
	popupElement: popupProfile,
	handleFormSubmit: (data) => {
		api.sendUserData(data)
			.then((res) => {
				userInfo.setUserInfo({
					userName: res.name,
					userDescription: res.about
				});
				popupEditProfile.close();
			}).catch((err) => console.log(`При редактировании профиля возникла ошибка: ${err}`));
	}
})

// Создание класса Попапа добавления Карточки
const popupAddCard = new PopupWithForm({
	popupElement: popupNewCard,
	handleFormSubmit: (data) => {
		api.addNewCard({ name: data.imageName, link: data.imageLink })
			.then((card) => {
				cardsList.addNewItem(createCard(card));
				popupAddCard.close();
			}).catch((err) => console.log(`При добавлении карточки возникла ошибка: ${err}`));
	}
})

// Создания класса Попапа редактирования Аватара
const popupEditAvatar = new PopupWithForm({
	popupElement: popupAvatar,
	handleFormSubmit: (data) => {
		userInfo.setUserAvatar(data);
		popupEditAvatar.close();
	}
})

// Слушатель на кнопку Редактирования Профиля
buttonEditProfile.addEventListener('click', () => {
	popupEditProfile.open();
	profileValidator.deleteErrors();
	const user = userInfo.getUserInfo();
	nameInput.value = user.name;
	jobInput.value = user.description;
})

// Слушатель на кнопку Добавления Карточки
buttonAddNewCard.addEventListener('click', () => {
	popupAddCard.open();
	cardValidator.toggleButtonState();
	cardValidator.deleteErrors();
})

// Слушатель на кнопку Смены Аватара
buttonEditAvatar.addEventListener('click', () => {
	popupEditAvatar.open();
	avatarValidator.toggleButtonState();
	avatarValidator.deleteErrors();
})

//=====================================
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupEditAvatar.setEventListeners();
popupSerchImage.setEventListeners();
popupDeleteCard.setEventListeners();

// Создание класса Валидации Формы редактирования Профиля
const profileValidator = new FormValidator(validationConfig, formElementProfile);

// Создание класса Валидации Формы создания Карточки
const cardValidator = new FormValidator(validationConfig, formElementNewCard);

// Создание класса Валидации Формы редактирования Аватара
const avatarValidator = new FormValidator(validationConfig, formElementAvatar);

//=====================================
profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidator.enableValidation();