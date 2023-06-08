const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

const allowedCors = [
  'https://mesto.egorkeen.nomoredomains.rocks/sign-in',
  'https://api.mesto.egorkeen.nomoredomains.rocks/sign-in',
  'http://mesto.egorkeen.nomoredomains.rocks/sign-in',
  'http://api.mesto.egorkeen.nomoredomains.rocks/sign-in',
]

module.exports = { URL_REGEX, allowedCors };
