import { Popup } from "./Popup";

export class PopupWithDelete extends Popup {
	constructor({ popupElement, cardDelete }) {
		super(popupElement);
		this._cardDelete = cardDelete;

		this._buttonConfirmDelete = this._popup.querySelector('.popup__button-submit');
	}

	open(card) {
		super.open();
		this._card = card;
	}

	setEventListeners() {
		super.setEventListeners();

		this._buttonConfirmDelete.addEventListener('click', () => {
			this._cardDelete(this._card, this._card._cardId);
		})
	}

}