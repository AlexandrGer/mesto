export class Card {
	constructor({ data, handleCardClick }, templateSelector) {
		this._name = data.name;
		this._link = data.link;
		this._templateSelector = templateSelector;
		this._handleCardClick = handleCardClick;
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

		this._nameCard.textContent = this._name;
		this._photoCard.src = this._link;
		this._photoCard.alt = this._name;

		return this._element;
	};

	_handleLike = () => {
		this._likeCard.classList.toggle('element__button-like_active');
	};

	_handleDeleteCard = () => {
		this._element.remove();
	};

	_setEventListeners() {
		this._likeCard.addEventListener('click', this._handleLike);

		this._deleteCard.addEventListener('click', this._handleDeleteCard);

		this._photoCard.addEventListener('click', () => {
			this._handleCardClick(this._name, this._link);
		})
	}
};
