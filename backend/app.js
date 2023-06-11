// импортируем все необходимое
// express, b-p, mongoose
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const handleErrors = require('./middlewares/handleErrors');

const { DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

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

// ошибка 404
const NotFoundError = require('./errors/NotFoundError');

// создать порт
const PORT = process.env.PORT || 3000;

// миддлвэры
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключить cors
app.use(cors());

// подключить helmet
app.use(helmet());

// подключить rateLimiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

// подключить логгер запросов
app.use(requestLogger);

// краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// используем все роуты
app.use(signInRouter);
app.use(signUpRouter);
app.use(auth, cardRouter);
app.use(auth, userRouter);

// создать миддлуэр на случай несуществующей страницы
app.use(auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// подключить логгер ошибок
app.use(errorLogger);

// отслеживать ошибки
app.use(errors());
app.use(handleErrors);

// подключиться к базе данных
mongoose.connect(DB_URL);
// запустить сервер на порту
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
