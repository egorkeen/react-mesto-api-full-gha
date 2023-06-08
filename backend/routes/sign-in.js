const signInRouter = require('express').Router();

const { login } = require('../controllers/users');

const celebrate = require('../middlewares/celebrate');

signInRouter.post('/sign-in', celebrate.celebrateLogin, login);

module.exports = signInRouter;
