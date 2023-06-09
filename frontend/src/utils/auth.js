class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }
    // проверить статус запроса
  _checkStatus(res) {
    if (res) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    };
  };

  register(userData) {
    return fetch(this._baseUrl + '/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'mesto.egorkeen.nomoredomains.rocks',
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password
      })
    }).then(this._checkStatus);
  };  

  auth(userData) {
    return fetch(this._baseUrl + '/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password
      })
    }).then(this._checkStatus);
  };

  checkToken(token) {
     return fetch(this._baseUrl +'/users/me', {
       method: 'GET',
       headers: {
         'Content-Type': "application/json",
         authorization: `Bearer ${token}`,
       }
    })
    .then(this._checkStatus);
  };
};

const auth = new Auth('https://api.mesto.egorkeen.nomoredomains.rocks');

export default auth;