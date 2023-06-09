import React from 'react';

function ImagePopup({card, onClose}) {
  return(
    <div className={`popup image-popup ${card ? 'popup_active' : ''}`}>
      <div className="popup__image-container">
        <button type="button" className="popup__close-button" aria-label="Закрыть окно" onClick={onClose}/>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <span className="popup__image-span">{card?.name}</span>
      </div>
    </div>
  )
}

export default ImagePopup;