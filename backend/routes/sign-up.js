const signUpRouter = require('express').Router();

const { createUser } = require('../controllers/users');

const celebrate = require('../middlewares/celebrate');

signUpRouter.post('/sign-up', celebrate.celebrateCreateUser, createUser);

module.exports = signUpRouter;
