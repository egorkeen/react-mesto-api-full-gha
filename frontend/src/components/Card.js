import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";

function Card({ _id, card, onCardClick, onDeleteClick, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const [isLiked, setIsLiked] = useState(
    card.likes.some((i) => i._id === currentUser._id)
  );
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  function handleLikeClick() {
    if (!isLiked) {
      onCardLike(card);
      setIsLiked(true);
    } else {
      onCardLike(card);
      setIsLiked(false);
    }
  }

  function handleDeleteClick() {
    onDeleteClick(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="element">
      {isOwn && (
        <button
          type="button"
          className="element__delete-button"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Кнопка лайка"
            onClick={handleLikeClick}
          />
          <span className="element__like-amount">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
