export class UserInfo {
	constructor({ userNameSelector, userDescriptionSelector, userAvatarSelector }) {
		this._userName = userNameSelector;
		this._userDescription = userDescriptionSelector;
		this._userAvatar = userAvatarSelector;
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

	setUserAvatar({ imageAvatar }) {
		this._userAvatar.src = imageAvatar;
	}
}