class Card {
	constructor(data, templateSelector, popup) {
		this._name = data.name;
		this._link = data.link;
		this._templateSelector = templateSelector;
		this._popup = popup;
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
			this._popup({
				name: this._name,
				link: this._link,
			});
		})
	};
}

export default Card;