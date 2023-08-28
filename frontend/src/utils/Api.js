class Api {

  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  };

  // проверить статус запроса
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      new Error(`${res.status} ${res.statusText}`);
    };
  };

  // получить данные пользователя с сервера
  getUserData() {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkStatus);
  };

  // обновить данные пользователя на сервере
  setUserData(userData) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
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
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        avatar: link
      })
    }).then(this._checkStatus);
  };

  // получить карточки с сервера
  getInitialCards() {
    return fetch( this._baseUrl + '/cards', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkStatus);
  };

  // добавить карточку на сервер
  addCard(dataCard) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
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
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        _id: cardId
      })
    }).then(this._checkStatus);
  };

  // лайкнуть
  like(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._checkStatus);
  };

  // убрать лайк
  dislike(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
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
const api = new Api ('http://localhost:3000');

export default api;