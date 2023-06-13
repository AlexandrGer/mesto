export class Card {
	constructor({ data, handleCardClick, handleCardDelete }, userId, templateSelector) {
		this._name = data.name;
		this._link = data.link;
		this._cardId = data._id;
		this._ownerId = data.owner._id;
		this._userId = userId;
		this._templateSelector = templateSelector;
		this._handleCardClick = handleCardClick;
		this._handleCardDelete = handleCardDelete;
	}

	_getTemplate() {
		const cardElement = document.querySelector(this._templateSelector)
			.content
			.querySelector('.element')
			.cloneNode(true);

		return cardElement;
	}

	generateCard() {
		this._element = this._getTemplate();

		this._nameCard = this._element.querySelector('.element__title');
		this._photoCard = this._element.querySelector('.element__image');
		this._likeCard = this._element.querySelector('.element__button-like');
		this._deleteCard = this._element.querySelector('.element__button-delete');

		this._setEventListeners();
		this._toggleDeleteButton();

		this._nameCard.textContent = this._name;
		this._photoCard.src = this._link;
		this._photoCard.alt = this._name;

		return this._element;
	};

	_handleLike = () => {
		this._likeCard.classList.toggle('element__button-like_active');
	};

	removeCard = () => {
		this._element.remove();
	};

	_setEventListeners() {
		this._likeCard.addEventListener('click', this._handleLike);

		this._deleteCard.addEventListener('click', this._handleCardDelete);

		this._photoCard.addEventListener('click', () => {
			this._handleCardClick(this._name, this._link);
		})
	}

	_toggleDeleteButton() {
		if (this._userId === this._ownerId) {
			this._deleteCard.classList.add('element__button-delete_active');
		}
	}
};
