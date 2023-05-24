export class UserInfo {
	constructor({ userNameSelector, userDescriptionSelector }) {
		this._userName = userNameSelector;
		this._userDescription = userDescriptionSelector;
	}

	getUserInfo() {
		const userInfo = {
			name: this._userName.textContent,
			description: this._userDescription.textContent
		}

		return (userInfo);
	}

	setUserInfo({ userName, userDescription }) {
		this._userName.textContent = userName;
		this._userDescription.textContent = userDescription;
	}
}