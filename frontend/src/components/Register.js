import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSignUp({
      email: email,
      password: password
    })
  };

  return(
    <div className='page'>
      <Header>
        <div className='header__container'>
          <Link to='/sign-in' className='header__link'>Войти</Link>
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
        <div className='start-form__container'>
          <button type='submit' className="start-form__submit-button">Зарегистрироваться</button>
          <Link to="/sign-in" className="start-form__link">Уже зарегистрированы? Войти</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;