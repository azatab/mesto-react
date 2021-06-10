import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react'
import api from '../utils/api'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
//import './App.css';

function App() {
  const [currentUser, setCurrentUser] = React.useState('')
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})

  React.useEffect(() => {
    Promise.all([api.getUserInfo()])
    .then(([userData]) => {
      setCurrentUser(userData)
    })
    .catch((err) => console.log(err))
  }, [])
  
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  function handleUpdateUser (inputValues) {
    api.setUserInfo(inputValues)
    .then((userData) => {
      setCurrentUser(userData)
      closeAllPopups()
    })
    .catch((err) => console.log(`Ошибка - ${err}`))
  }

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value = {currentUser}>
          <Header />
          <Main 
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onEditAvatar = {handleEditAvatarClick}
            onCardClick = {handleCardClick}
            />
          <Footer />
          
          <EditProfilePopup 
            isOpen = {isEditProfilePopupOpen} 
            onClose = {closeAllPopups}
            onUpdateUser = {handleUpdateUser} 
          />

          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
          />

          <PopupWithForm 
            name={'add'}
            title={'Новое место'}
            children={
              <>
                <input className="form__input" type="text" id="input-place-name" aria-label="Название" placeholder="Название" name="place" minLength="2" maxLength="30" required />
                  <span className="input-place-name-error form__input-error"></span>
                  <input className="form__input" type="url" id="input-image-link" aria-label="ссылка" placeholder="Ссылка на картинку" name="link" required />
                  <span className="input-image-link-error form__input-error"></span>
              </>
            }
            buttonLabel={'Создать'}
            isOpen = {isAddPlacePopupOpen}
            onClose = {closeAllPopups}
          />
          <PopupWithForm 
            name={'confirm-delete'}
            title={'Вы уверены?'}
            buttonLabel={'Да'}
            onClose = {closeAllPopups}
            
          />
          
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </CurrentUserContext.Provider>        
      </div>
    </div>
  );
}

export default App;