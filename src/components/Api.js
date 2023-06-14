export class Api {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
		this._authorization = config.headers.authorization;
	}

	// Получение данных о пользователе с сервера
	getUserData() {
		return fetch(`${this._url}/users/me`, {
			headers: {
				authorization: '3c161b6c-5a5d-4642-af7d-6f12393d02c0',
				'Content-type': 'application/json',
			},
		})
			.then(this._handleResponse)
	}

	// Отправка полученных данных о пользователе на сервер
	sendUserData(userData) {
		console.log(userData)
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: '3c161b6c-5a5d-4642-af7d-6f12393d02c0',
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				name: userData.profileName,
				about: userData.profileJob
			})
		})
			.then(this._handleResponse)
	}

	// Смена аватара пользователя
	sendAvatarData(userAvatar) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: '3c161b6c-5a5d-4642-af7d-6f12393d02c0',
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				avatar: userAvatar.imageAvatar
			})
		})
			.then(this._handleResponse)
	}

	// Добавление новой карточки на сервер
	addNewCard({ name, link }) {
		return fetch(`${this._url}/cards`, {
			method: 'POST',
			headers: {
				authorization: '3c161b6c-5a5d-4642-af7d-6f12393d02c0',
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ name, link })
		})
			.then(this._handleResponse)
	}

	// Загрузка карточек с сервера
	getCards() {
		return fetch(`${this._url}/cards`, {
			headers: {
				authorization: '3c161b6c-5a5d-4642-af7d-6f12393d02c0',
				'Content-type': 'application/json',
			},
		})
			.then(this._handleResponse)
	}

	// Удаление карточки
	deleteCard(cardId) {
		return fetch(`${this._url}/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: '3c161b6c-5a5d-4642-af7d-6f12393d02c0',
				'Content-type': 'application/json',
			},
		})
			.then(this._handleResponse)
	}

	// Постановка лайка
	putLike(cardId) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: {
				authorization: '3c161b6c-5a5d-4642-af7d-6f12393d02c0',
				'Content-type': 'application/json',
			},
		})
			.then(this._handleResponse)
	}

	// Удаление лайка
	deleteLike(cardId) {
		return fetch(`${this._url}/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: {
				authorization: '3c161b6c-5a5d-4642-af7d-6f12393d02c0',
				'Content-type': 'application/json',
			},
		})
			.then(this._handleResponse)
	}

	_handleResponse(res) {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(`Возникла ошибка: ${res.status}`)
		}
	}
}