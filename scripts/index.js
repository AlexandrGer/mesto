let popup = document.querySelector('.popup');
let addButton = document.querySelector('.button_action_edit');
let closeButton = document.querySelector('.button_action_close');
// =========================================
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_job');
// =========================================
let formElement = document.querySelector('.popup__container');

function handleEditProfileClick() {
	nameInput.value = nameProfile.textContent;
	jobInput.value = jobProfile.textContent;
}

function openPopup() {
	popup.classList.add('popup_opened');
	handleEditProfileClick();
}

function closePopup() {
	popup.classList.remove('popup_opened');
}

addButton.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup);

function handleFormSubmit(evt) {
	evt.preventDefault();

	nameProfile.textContent = nameInput.value;
	jobProfile.textContent = jobInput.value;

	closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);