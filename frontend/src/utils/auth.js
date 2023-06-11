class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }
    // проверить статус запроса
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    };
  };

  register(userData) {
    return fetch(this._baseUrl + '/signup', {
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
    return fetch(this._baseUrl + '/signin', {
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
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
       }
    })
    .then(this._checkStatus);
  };
};

const auth = new Auth('https://api.mesto.egorkeen.nomoredomains.rocks');

export default auth;