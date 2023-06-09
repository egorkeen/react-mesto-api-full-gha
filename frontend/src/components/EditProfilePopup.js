import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name-input"
        name="name"
        className="form__input form__input_data_name"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        required
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="form__input-error name-input-error" />
      <input
        type="text"
        id="info-input"
        name="about"
        className="form__input form__input_data_info"
        placeholder="Описание"
        minLength={2}
        maxLength={200}
        required
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span className="form__input-error info-input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
