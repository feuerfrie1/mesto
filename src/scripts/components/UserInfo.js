export class UserInfo {
  constructor(author) {
    this._name = author.profileAuthor;
    this._info = author.profileStatus;
    this._avatar = author.profileAvatar;
    this.userAvatar = document.querySelector(".profile__avatar");
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._info.textContent,
      avatar: this._avatar.textContent,
    };
    return userInfo;
  }

  writeUserAvatar(data) {
    this._avatar.src = data.avatar;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
