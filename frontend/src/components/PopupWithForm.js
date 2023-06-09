import React from 'react';

function PopupWithForm(props) {

  return (
    <div className={`popup ${props.name}-popup ${props.isOpen ? 'popup_active' : ''}`} noValidate="">
      <form className="form" name={`${props.name}-form`} onSubmit={props.onSubmit}>
        <button type="button" className="popup__close-button" aria-label="Закрыть окно" onClick={props.onClose}/>
        <h3 className="form__title">{props.title}</h3>
        {props.children}
        <button 
          type="submit"  
          className="form__submit-button" 
          aria-label="Сохранить изменения">{props.buttonText}</button>
      </form>
    </div>
  )
}

export default PopupWithForm;