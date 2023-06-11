/* импорты */
//стили
import "../index.css";
//картинки
import successImage from "../images/success.png";
import errorImage from "../images/error.png";
//react
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
//компоненты
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
//api
import api from "../utils/Api";
import auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [cards, setCards] = useState([]);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("example@example.com");
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/", { replace: true });
            setEmail(res.email);
            api
            .getUserData()
            .then((res) => {
              setCurrentUser(res);
              api
                .getInitialCards()
                .then((res) => {
                  setCards(res);
                })
            })
          }
        })
        .catch((err) => console.log(err));
    }
  };
  // закрыть попапы
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSuccessPopupOpen(false);
    setErrorPopupOpen(false);
    setSelectedCard(null);
  }
  // открыть попап смены аватара
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  // открыть попап редактирования профиля
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  // открыть попап добавления места
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  // отследить нажатие на карточку
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  // отследить нажатие удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const updatedCards = cards.slice().filter((c) => c !== card);
        setCards(updatedCards);
      })
      .catch((err) => console.log(err));
  }
  // отследить нажатие кнопки лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }
  // обновить данные пользователя
  function handleUpdateUser(userData) {
    api
      .setUserData(userData)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  // обновить аватар
  function handleUpdateAvatar(avatarLink) {
    api
      .setAvatar(avatarLink)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  // добавить место (кнопка submit)
  function handleAddPlaceSubmit(dataCard) {
    api
      .addCard(dataCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleSignUpSubmit(userData) {
    auth
      .register(userData)
      .then((res) => {
        // временное решение проблемы, в дальнейшем требуется реализовать
        // валидацию при помощи регулярного выражения
        if (res.statusCode === 200 || 201) {
          setSuccessPopupOpen(true);
          navigate("/signin", { replace: true });
        } else {
          setErrorPopupOpen(true);
        }
      })
      .catch((err) => {
        setErrorPopupOpen(true);
        console.log(err);
      });
  }

  function handleSignInSubmit(userData) {
    auth
      .auth(userData)
      .then((res) => {
        if (res.statusCode === 200 || 201) {
          const token = res.token;
          localStorage.setItem("jwt", token);
          api
            .getUserData()
            .then((userData) => {
              setCurrentUser(userData);
              setLoggedIn(true);
              navigate("/", { replace: true });
              setEmail(userData.email);
              api
                .getInitialCards()
                .then((cards) => {
                  setCards(cards);
                })
            })
            .catch((err) => console.log(err));
        } else {
          setErrorPopupOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorPopupOpen(true);
      });
  }

  function handleSignOutClick() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate("/signin", { replace: true });
    setEmail("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={Main}
              loggedIn={isLoggedIn}
              onSignOut={handleSignOutClick}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onDeleteClick={handleCardDelete}
              onCardLike={handleCardLike}
              email={email}
            />
          }
        ></Route>
        <Route
          path="/signin"
          element={<Login onSignIn={handleSignInSubmit} />}
        />
        <Route
          path="/signup"
          element={<Register onSignUp={handleSignUpSubmit} />}
        />
      </Routes>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm
        name="confirmation"
        title="Вы уверены?"
        buttonText="Да"
      ></PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <InfoTooltip
        imgLink={successImage}
        alt={"Регистрация прошла успешно!"}
        titleText={"Вы успешно зарегистрировались!"}
        isOpen={isSuccessPopupOpen}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        imgLink={errorImage}
        alt={"Ошибка! Попробуйте ещё раз."}
        titleText={"Что-то пошло не так! Попробуйте ещё раз."}
        isOpen={isErrorPopupOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
