// Кнопки
const buttonEditProfile = document.querySelector('.profile__button-edit');
const buttonAddNewCard = document.querySelector('.profile__button-add');
const buttonDeleteCard = document.querySelector('.element__button-delete');

// Переменные из секции Профиль
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

// Попап
const popup = document.querySelector('.popup');

// Попап Редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
const buttonCloseProfile = popupTypeEdit.querySelector('.popup__button-close');
const nameInput = popupTypeEdit.querySelector('.popup__text_type_name');
const jobInput = popupTypeEdit.querySelector('.popup__text_type_job');
const formElementProfile = popupTypeEdit.querySelector('.popup__container');

// Попап Добавления Новых Карточек
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const buttonCloseCard = popupTypeNewCard.querySelector('.popup__button-close');
const titleImg = popupTypeNewCard.querySelector('.popup__text_type_title');
const srcImg = popupTypeNewCard.querySelector('.popup__text_type_src');
const formElementImg = popupTypeNewCard.querySelector('.popup__container');

// Попап Просмотра Картинок
const popupViewImg = document.querySelector('.popup_type_view-img');
const buttonCloseImg = popupViewImg.querySelector('.popup__button-close');
const popupTitleImg = popupViewImg.querySelector('.popup__caption');
const popupScalableImg = popupViewImg.querySelector('.popup__img');

//======================
const cardList = document.querySelector('.elements__items');
const cardTemplate = document.querySelector('#cards-element').content;

// Функция открытия Попапа
function openPopup(popupElement) {
	popupElement.classList.add('popup_opened');
}

// Функция закрытия Попапа
function closePopup(popupElement) {
	popupElement.classList.remove('popup_opened');
}

// Функция которая при открытии заполняет Форму данными с Профиля
function handleEditProfileClick() {
	openPopup(popupTypeEdit);
	nameInput.value = nameProfile.textContent;
	jobInput.value = jobProfile.textContent;
}

// Обработчик события ОТКРЫТИЯ Попапа Редактирования Профиля
buttonEditProfile.addEventListener('click', handleEditProfileClick)

// Обработчик события ОТКРЫТИЯ Попапа Добавления Карточек
buttonAddNewCard.addEventListener('click', () => {
	openPopup(popupTypeNewCard);
});

// Обработчик события ЗАКРЫТИЯ Попапа Редактирования Профиля
buttonCloseProfile.addEventListener('click', function () {
	closePopup(popupTypeEdit);
});

// Обработчик события ЗАКРЫТИЯ Попапа Добавления Карточек
buttonCloseCard.addEventListener('click', function () {
	closePopup(popupTypeNewCard);
});

// Обработчик события ЗАКРЫТИЯ Попапа Просмотра Картинки
buttonCloseImg.addEventListener('click', function () {
	closePopup(popupViewImg);
});

// Функция сохраняющая введенные пользователем данные в Профиль
function handleProfileFormSubmit(evt) {
	evt.preventDefault();
	nameProfile.textContent = nameInput.value;
	jobProfile.textContent = jobInput.value;
	closePopup(popupTypeEdit);
}

// Обработчик события ОТПРАВКИ формы Редактирования Профиля
formElementProfile.addEventListener('submit', handleProfileFormSubmit);

//Функция добавления карточки через попап
function addCard(srcImg, titleImg) {
	const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

	cardElement.querySelector('.element__image').src = srcImg;
	cardElement.querySelector('.element__image').alt = titleImg;
	cardElement.querySelector('.element__title').textContent = titleImg;
	cardElement.querySelector('.element__button-like').addEventListener('click', function (evt) {
		evt.target.classList.toggle('element__button-like_active');
	});
	cardElement.querySelector('.element__button-delete').addEventListener('click', function (evt) {
		evt.target.closest('.element').remove();
	})
	cardElement.querySelector('.element__image').addEventListener('click', function () {
		openPopup(popupViewImg);
		popupTitleImg.textContent = titleImg;
		popupScalableImg.src = srcImg;
		popupScalableImg.alt = titleImg;
	})

	cardList.prepend(cardElement);
	return cardElement;
}

//Функция перебора массива и вывод карточек на страницу при загрузке
initialCards.forEach(function (element) {
	const newCard = addCard(element.link, element.name);
	cardList.append(newCard);
});

//Функция присваивания значений из попапа в Карточку
function handleImgFormSubmit(evt) {
	evt.preventDefault();
	addCard(srcImg.value, titleImg.value);
	titleImg.value = '';
	srcImg.value = '';
	closePopup(popupTypeNewCard);
}

// Обработчик события ОТПРАВКИ формы Добавления Карточки
formElementImg.addEventListener('submit', handleImgFormSubmit);

