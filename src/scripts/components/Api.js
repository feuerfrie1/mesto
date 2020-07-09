export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`error${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`error${res.status}`);
    });
  }

  updateUserInfo(userName, userJob) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: userName,
        about: userJob,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`error${res.status}`);
    });
  }

  addNewCard(cardName, cardLink) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`error${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`error${res.status}`);
    });
  }

  putLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
      })
      .then((data) => data);
  }

  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
      })
      .then((data) => data);
  }

  setUserAvatar(userAvatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: userAvatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    });
  }
}
