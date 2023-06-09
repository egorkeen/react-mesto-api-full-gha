import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarInput = React.useRef();

  useEffect(() => {
    avatarInput.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(avatarInput.current.value);
  };


  return(
    <PopupWithForm
      name="avatar" 
      title="Обновить аватар" 
      buttonText="Сохранить"
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input 
        type="url" 
        id="avatar-input" 
        name="avatar" 
        className="form__input form__input_avatar_link" 
        placeholder="Ссылка на аватар" 
        required
        ref={avatarInput} />
      <span className="form__input-error avatar-input-error" /> 
    </PopupWithForm>
  );
};

export default EditAvatarPopup;