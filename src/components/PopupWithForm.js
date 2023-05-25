import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
	constructor({ popupElement, handleFormSubmit }) {
		super(popupElement);

		this._handleFormSubmit = handleFormSubmit;

		this._form = this._popup.querySelector('.popup__form')
	}

	_getInputValues() {
		this._inputList = this._popup.querySelectorAll('.popup__input');

		this._formValues = {};

		this._inputList.forEach(input => {
			this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}

	setEventListeners() {
		super.setEventListeners();

		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();

			this._handleFormSubmit(this._getInputValues());
		});
	}

	close() {
		super.close();

		this._form.reset();
	}
}