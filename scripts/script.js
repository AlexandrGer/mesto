let popup = document.querySelector('.popup');
let addButton = document.querySelector('.button_action_edit');
let closeButton = document.querySelector('.button_action_close');

// if (addButton.addEventListener('click', ())) {
// 	popup.classList.add('popup_opened');
// }

addButton.addEventListener('click', () => {
	popup.classList.add('popup_opened');
});

closeButton.addEventListener('click', () => {
	popup.classList.remove('popup_opened');
});


