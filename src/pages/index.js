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

// Создание класса Информации о Пользователе
const userInfo = new UserInfo({
	userNameSelector: nameProfile,
	userDescriptionSelector: jobProfile,
	userAvatarSelector: avatarProfile
})

Promise.all([api.getCards(), api.getUserData()]).then(([cardsArray, userProfileInfo]) => {
	userId = userProfileInfo._id;
	userInfo.setUserInfo({ userName: userProfileInfo.name, userDescription: userProfileInfo.about });
	userInfo.setUserAvatar({ imageAvatar: userProfileInfo.avatar });
	cardsList.renderItems(cardsArray);
}).catch((err) => console.log(`Возникла ошибка: ${err}`))

// Функция создания карточки и передача ее в Попап просмотра Картинки
const createCard = (cardItem) => {
	const card = new Card({
		data: cardItem,
		handleCardClick: () => {
			popupSerchImage.open(cardItem);
		},
		handleCardDelete: () => {
			// console.log(card);
			popupDeleteCard.open(card);
		},
		handleLikeCard: (cardId) => {
			api.putLike(cardId)
				.then((res) => {
					card.toggleLikes(res);
				}).catch((err) => console.log(`При постановке лайка возникла ошибка: ${err}`));
		},
		handleDeleteLikeCard: (cardId) => {
			api.deleteLike(cardId)
				.then((res) => {
					card.toggleLikes(res);
				}).catch((err) => console.log(`При удаление лайка возникла ошибка: ${err}`));
		},
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

// Создание класса Попапа просмотра Картинки
const popupSerchImage = new PopupWithImage(popupSerchCard);

// Создание класса Попапа удаления Картинки
const popupDeleteCard = new PopupWithDelete({
	popupElement: popupDelete,
	cardDelete: (card, cardId) => {
		api.deleteCard(cardId)
			.then(() => {
				card.removeCard();
				popupDeleteCard.close();
			}).catch((err) => console.log(`При удалении карточки возникла ошибка: ${err}`))
	}
})

// Создание класса Попапа редактирования Профиля
const popupEditProfile = new PopupWithForm({
	popupElement: popupProfile,
	handleFormSubmit: (data) => {
		popupEditProfile.renderLoading(true);
		api.sendUserData(data)
			.then((res) => {
				userInfo.setUserInfo({
					userName: res.name,
					userDescription: res.about
				});
				popupEditProfile.close();
			}).catch((err) => console.log(`При редактировании профиля возникла ошибка: ${err}`))
			.finally(() => { popupEditProfile.renderLoading(false); })
	}
})

// Создания класса Попапа редактирования Аватара
const popupEditAvatar = new PopupWithForm({
	popupElement: popupAvatar,
	handleFormSubmit: (data) => {
		popupEditAvatar.renderLoading(true);
		api.sendAvatarData(data)
			.then((res) => {
				userInfo.setUserAvatar({
					imageAvatar: res.avatar,
				});
				popupEditAvatar.close();
			}).catch((err) => console.log(`При смене аватара возникла ошибка: ${err}`))
			.finally(() => { popupEditAvatar.renderLoading(false); })
	}
})

// Создание класса Попапа добавления Карточки
const popupAddCard = new PopupWithForm({
	popupElement: popupNewCard,
	handleFormSubmit: (data) => {
		popupAddCard.renderLoading(true);
		api.addNewCard({ name: data.imageName, link: data.imageLink })
			.then((card) => {
				cardsList.addNewItem(createCard(card));
				popupAddCard.close();
			}).catch((err) => console.log(`При добавлении карточки возникла ошибка: ${err}`))
			.finally(() => { popupAddCard.renderLoading(false); })
	}
})

// Слушатель на кнопку Редактирования Профиля
buttonEditProfile.addEventListener('click', () => {
	popupEditProfile.open();
	profileValidator.toggleButtonState();
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