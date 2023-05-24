import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);

		this._nameCard = this._popup.querySelector('.popup__caption');
		this._srcCard = this._popup.querySelector('.popup__img');
	}

	openPopup(image) {
		this._nameCard.textContent = image.name;
		this._srcCard.src = image.link;
		super.openPopup();
	}
}