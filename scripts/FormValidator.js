class FormValidator {
	constructor(config, formElement) {
		this._formSelector = config.formSelector;
		this._inputSelector = config.inputSelector;
		this._submitButtonSelector = config.submitButtonSelector;
		this._inactiveButtonClass = config.inactiveButtonClass;
		this._inputErrorClass = config.inputErrorClass;
		this._errorClass = config.errorClass;
		this._formElement = formElement;
	}

	enableValidation() {
		this._setEventListeners();
	}

	_setEventListeners() {
		this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
		this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
		this._toggleButtonState();
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState();
			});
		});
	}

	_toggleButtonState() {
		if (this._hasInvalidInput()) {
			this._disableSubmitButton();
		} else {
			this._enableSubmitButton();
		}
	}

	_disableSubmitButton() {
		this._buttonElement.classList.add(this._inactiveButtonClass);
		this._buttonElement.setAttribute('disabled', true);
	}

	_enableSubmitButton() {
		this._buttonElement.classList.remove(this._inactiveButtonClass);
		this._buttonElement.removeAttribute('disabled', true);
	}

	_hasInvalidInput() {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		})
	};

	_checkInputValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		}
	};

	_showInputError(inputElement, errorMessage) {
		const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
		inputElement.classList.add(this._inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._errorClass);
	};

	_hideInputError(inputElement) {
		const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
		inputElement.classList.remove(this._inputErrorClass);
		errorElement.classList.remove(this._errorClass);
		errorElement.textContent = '';
	};
}

export default FormValidator;