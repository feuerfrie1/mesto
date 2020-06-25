export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
      this._name = nameSelector;
      this._info = aboutSelector;
  }

  getUserInfo() { 
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.info;
  }
}