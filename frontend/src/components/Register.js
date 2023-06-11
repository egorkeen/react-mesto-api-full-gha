import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // окончательная проверка валидности
    if (isEmailValid(email) && isPasswordValid(password)) {
      // Передача данных регистрации на сервер
      props.onSignUp({
        email: email,
        password: password
      });
    } else {
      // в зависимости от того, какое поле некорректно, вылезет ошибка
      // для определенного поля
      setEmailError(isEmailValid(email) ? null : 'Введён некорректный email');
      setPasswordError(isPasswordValid(password) ? null : 'Введён некорректный пароль');
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6 && password.length <= 12;
  }

  return(
    <div className='page'>
      <Header>
        <div className='header__container'>
          <Link to='/signin' className='header__link'>Войти</Link>
        </div>
      </Header>
      <form onSubmit={handleSubmit} className="start-form" name="register-form">
        <h1 className='start-form__title'>Регистрация</h1>
        <input 
          onChange={handleEmailChange} 
          value={email} 
          type='email' 
          name='email' 
          className="start-form__input" 
          placeholder='Email'
          minLength={4}
          maxLength={30}
          required />
        <span className={`start-form__validation-error ${isEmailValid(email) ? '' : 'start-form__validation-error_active'}`}>
          {emailError}
        </span>
        <input 
          onChange={handlePasswordChange} 
          value={password} 
          type='password' 
          name='password' 
          className="start-form__input" 
          placeholder='Пароль'
          minLength={6}
          maxLength={12}
          required />
        <span className={`start-form__validation-error ${isPasswordValid(password) ? '' : 'start-form__validation-error_active'}`}>
          {passwordError}
        </span>
        <div className='start-form__container'>
          <button type='submit' className="start-form__submit-button">Зарегистрироваться</button>
          <Link to="/signin" className="start-form__link">Уже зарегистрированы? Войти</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;