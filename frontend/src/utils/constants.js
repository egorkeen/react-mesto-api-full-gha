// формы
const profileForm = document.forms['profile-form'];
const cardForm = document.forms['card-form'];
const avatarForm =document.forms['avatar-form'];

// данные профиля
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileAvatar = document.querySelector('.profile__avatar');

// кнопки
const editButton = document.querySelector('.profile__edit-button');
const avatarEditButton = document.querySelector('.profile__edit-avatar');
const addButton = document.querySelector('.profile__add-button');

// данные инпутов, имя и описание
const nameInput = document.querySelector('.form__input_data_name');
const infoInput = document.querySelector('.form__input_data_info');

// конфиг валидации
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputError: 'form__input_type_error',
  activeInputError: 'form__input-error_active',
  submitButtonSelector: '.form__submit-button',
  activeButtonClass: 'form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive'
}

export {
  profileForm,
  cardForm,
  avatarForm,
  profileName,
  profileAbout,
  profileAvatar,
  editButton,
  avatarEditButton,
  addButton,
  nameInput,
  infoInput,
  validationConfig
}