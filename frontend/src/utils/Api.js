class Api {

  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  };

  // проверить статус запроса
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    };
  };

  // получить данные пользователя с сервера
  getUserData() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    }).then(this._checkStatus);
  };

  // обновить данные пользователя на сервере
  setUserData(userData) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    }).then(this._checkStatus);
  };

  // обновить аватар пользователя
  setAvatar(link) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    }).then(this._checkStatus);
  };

  // получить карточки с сервера
  getInitialCards() {
    return fetch( this._baseUrl + '/cards', {
      headers: this._headers
    }).then(this._checkStatus);
  };

  // добавить карточку на сервер
  addCard(dataCard) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: dataCard.name,
        link: dataCard.link
      })
    }).then(this._checkStatus);
  };

  // удалить карточку с сервера
  deleteCard(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId
      })
    }).then(this._checkStatus);
  };

  // лайкнуть
  like(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId
      })
    }).then(this._checkStatus);
  };

  // убрать лайк
  dislike(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId
      })
    }).then(this._checkStatus);
  };

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.like(cardId);
    } else {
      return this.dislike(cardId);
    };
  };
};

// API
const api = new Api ({
  baseUrl: 'https://api.mesto.egorkeen.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  }
});

export default api;