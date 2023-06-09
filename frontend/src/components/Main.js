import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Link } from 'react-router-dom';
import Card from './Card.js';
import Header from './Header.js';
import Footer from './Footer.js';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

    return (
      <div className="page">
        <Header>
          <div className='header__container'>
            <p className='header__email'>{props.email}</p>
            <Link to="/sign-in" onClick={props.onSignOut} className='header__link'>Выйти</Link>
          </div>
        </Header>
        <main className="content">
        <section className="profile">
          <div className="profile__edit-avatar" onClick={props.onEditAvatar} />
          <img src={currentUser?.avatar} className="profile__avatar" alt="Аватар" />
          <div className="profile__data">
            <h1 className="profile__name">{currentUser?.name}</h1>
            <p className="profile__about">{currentUser?.about}</p>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="Редактировать профиль"
              onClick={props.onEditProfile}
            />
          </div>
          <button
            type="button"
            className="profile__add-button"
            aria-label="Добавить картинку"
            onClick={props.onAddPlace}
          />
        </section>
        <section className="elements">
          {props.cards.map((card) => (<Card 
            key={card._id} 
            card={card} 
            onCardClick={props.onCardClick}
            onDeleteClick={props.onDeleteClick}
            onCardLike={props.onCardLike} />))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Main;