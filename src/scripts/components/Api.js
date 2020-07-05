export class Api {
    constructor({baseUrl}) {
      this._baseUrl = baseUrl;
    };

    _fetch(url, params) {
      params.headers = {
        authorization: '2eeb39c4-648d-45ea-9400-2121e3e34a4d',
        'Content-Type': 'application/json'
      };
    return fetch(this._baseUrl + url, params)
      .then((res) => {
        if(!res.ok) {
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      });
  }
  
    getInitialCards(url) {
      return this._fetch(url, {
        method: 'GET'
      })
    }

    getUserInterface(url) {
      return this._fetch(url, {
        method: 'GET'
      })
    }

    sendUserInfo(url, data) {
      return this._fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
          name: `${data.name}`,
          about: `${data.about}`
        })
      })
    }

    sendPlaceCard(url, data) {
      return this._fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          name: `${data.name}`,
          link: `${data.link}`
        })
      })
    }

    deleteCard(url) {
      return this._fetch(url, {
        method: 'DELETE'
      })
    }

    putLike(url) {
      return this._fetch(url, {
        method: 'PUT'
        })
    }
  
    changeAvatar(url, data) {
      return this._fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
          avatar: `${data.avatar}`
        })
      })
    }
  }