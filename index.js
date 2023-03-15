let popup = document.querySelector('.popup');
let addButton = document.querySelector('.button_action_edit');
let closeButton = document.querySelector('.button_action_close');
// =======================================
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_job');

function classAdded() {
	popup.classList.add('popup_opened');
	nameInput.value = nameProfile.textContent;
	jobInput.value = jobProfile.textContent;
}

function classRemoved() {
	popup.classList.remove('popup_opened');
}

addButton.addEventListener('click', classAdded)
closeButton.addEventListener('click', classRemoved);

let formElement = document.querySelector('.popup__container');

function handleFormSubmit(evt) {
	evt.preventDefault();

	let nameInput = document.querySelector('.popup__text_type_name').value;
	let jobInput = document.querySelector('.popup__text_type_job').value;

	nameProfile.textContent = nameInput;
	jobProfile.textContent = jobInput;

	classRemoved();
}

formElement.addEventListener('submit', handleFormSubmit);