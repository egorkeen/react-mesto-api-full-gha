// импортируем все необходимое
// express, b-p, mongoose
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const handleErrors = require('./middlewares/handleErrors');

// app
const app = express();

// логгеры
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

// роуты
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const signInRouter = require('./routes/sign-in');
const signUpRouter = require('./routes/sign-up');
const auth = require('./middlewares/auth');

// allowedCors
const allowedCors = require('./utils/constants');

// ошибка 404
const NotFoundError = require('./errors/NotFoundError');

// создать порт
const PORT = process.env.PORT || 3000;

// миддлвэры
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключить cors
app.use(cors({
  origin: allowedCors,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  allowedHeaders: ['Authorization'],

}));

// подключить логгер запросов
app.use(requestLogger);

// используем все роуты
app.use(signInRouter);
app.use(signUpRouter);
app.use(auth, cardRouter);
app.use(auth, userRouter);

// подключить логгер ошибок
app.use(errorLogger);

// отслеживать ошибки
// создать миддлуэр на случай несуществующей страницы
app.use(auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errors());
app.use(handleErrors);

// подключиться к базе данных
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
// запустить сервер на порту
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
