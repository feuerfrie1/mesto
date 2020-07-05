export class UserInfo {
  constructor({ nameSelector, jobSelector, avatar, inputAuthor, inputJob }, api) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
    this.avatar = document.querySelector(avatar);
    this._nameInput = inputAuthor;
    this._jobInput = inputJob;
    this._api = api;
  }

  userInterface() {
    this._api.getUserInterface('/users/me')
      .then((data) => {
        this._nameSelector.textContent = data.name;
        this._jobSelector.textContent = data.about;
        this.avatar.setAttribute('src', `${data.avatar}`);
        this.avatar.id = `${data._id}`;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }

  getUserInfo() {
    this._nameInput.value = this._nameSelector.textContent;
    this._jobInput.value = this._jobSelector.textContent;
    return {
      name: this._nameInput.value,
      about: this._jobInput.value
    }
  }
 
  setUserInfo(formData, text) {
    this._api.sendUserInfo('/users/me', formData)
      .then((data) => {
        this._nameSelector.textContent = data.name;
        this._jobSelector.textContent = data.about;
        document.querySelector('.popup').classList.remove('popup_opened');
        document.querySelector('.popup__submit_create').textContent = text;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }
}