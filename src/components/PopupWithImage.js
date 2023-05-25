import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
	constructor(popupElement) {
		super(popupElement);

		this._nameCard = this._popup.querySelector('.popup__caption');
		this._srcCard = this._popup.querySelector('.popup__img');
	}

	open(image) {
		this._nameCard.textContent = image.name;
		this._srcCard.src = image.link;
		this._srcCard.alt = image.name;
		super.open();
	}
}