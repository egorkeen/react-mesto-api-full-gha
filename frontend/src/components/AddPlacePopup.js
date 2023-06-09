import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    props.onAddPlace({
      name: name,
      link: link
    })
  }

  return(
    <PopupWithForm
      name="card" 
      title="Новое место" 
      buttonText="Создать"
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input 
        type="text" 
        id="place-input" 
        name="name" 
        className="form__input form__input_place_name" 
        placeholder="Название" 
        minLength={2} 
        maxLength={30} 
        required=""
        value={name}
        onChange={handleNameChange}/>
      <span className="form__input-error place-input-error"/>
      <input 
        type="url" 
        id="link-input" 
        name="link" 
        className="form__input form__input_place_link" 
        placeholder="Ссылка на картинку" 
        required=""
        value={link}
        onChange={handleLinkChange}/>
      <span className="form__input-error link-input-error"/>
    </PopupWithForm>
  );
};

export default AddPlacePopup;