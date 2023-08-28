import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isSubmitButtonActive, setSubmitButtonActive] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEmailValid(email) && isPasswordValid(password)) {
      props.onSignIn({
        email: email,
        password: password,
      });
    } else {
      // в зависимости от того, какое поле некорректно, вылезет ошибка
      // для определенного поля
      setEmailError(isEmailValid(email) ? null : 'Введите корректный email');
      setPasswordError(isPasswordValid(password) ? null : 'Длина пароля должна быть не меньше 6 символов');
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6 && password.length <= 12;
  }

  useEffect(() => {
    if (!isEmailValid(email)) {
      setEmailError('Введите корректный email');
    }
  }, [email]);

  useEffect(() => {
    if (password.length < 6) {
      setPasswordError('Длина пароля должна быть не меньше 6 символов');
    }
  }, [password]);

  useEffect(() => {
    if (isEmailValid(email) && (isPasswordValid(password))) {
      setSubmitButtonActive(true);
    } else {
      setSubmitButtonActive(false);
    }
  }, [email, password]);

  useEffect(() => {
    setEmailError('');
    setPasswordError('');
  }, []);

  return (
    <div className="page">
      <Header>
        <div className="header__container">
          <Link to="/signup" className="header__link">
            Регистрация
          </Link>
        </div>
      </Header>
      <form onSubmit={handleSubmit} className="start-form" name="login-form" noValidate>
        <h1 className="start-form__title">Вход</h1>
        <input
          type="email"
          name="email"
          value={email || ""}
          onChange={handleEmailChange}
          className="start-form__input"
          placeholder="Email"
          minLength={4}
          maxLength={30}
          required
        />
        <span className={`start-form__validation-error ${isEmailValid(email) ? '' : 'start-form__validation-error_active'}`}>
          {emailError}
        </span>
        <input
          type="password"
          name="password"
          value={password || ""}
          onChange={handlePasswordChange}
          className="start-form__input"
          placeholder="Пароль"
          minLength={6}
          maxLength={12}
          required
        />
        <span className={`start-form__validation-error ${isPasswordValid(password) ? '' : 'start-form__validation-error_active'}`}>
          {passwordError}
        </span>
        <div className="start-form__container">
          <button type="submit" className={`${isSubmitButtonActive ? 'start-form__submit-button' : 'start-form__submit-button_inactive'}`}>
            Войти
          </button>
          <Link to="sign-up" className="start-form__link" />
        </div>
      </form>
    </div>
  );
}

export default Login;
