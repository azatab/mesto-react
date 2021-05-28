import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react'
//import './App.css';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  
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

  return (
    <div className="page">
      <div className="page__container">

        <Header />
        <Main 
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onEditAvatar = {handleEditAvatarClick}
          onCardClick = {handleCardClick}
          />
        <Footer />
        <PopupWithForm 
          name={'edit'}
          title={'Редактировать профиль'}
          children={
            <>
              <input className="form__input" type="text" id="input-name" aria-label="имя" placeholder="Имя" name="name" minLength="2" maxLength="40" required />
                <span className="input-name-error form__input-error"></span>
                <input className="form__input" type="text" id="input-job" aria-label="работа" placeholder="Работа" name="job" minLength="2" maxLength="200" required />
                <span className="input-job-error form__input-error"></span>
            </>
          }
          buttonLabel={'Сохранить'}
          isOpen = {isEditProfilePopupOpen}
          onClose = {closeAllPopups}
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
        <PopupWithForm 
          name={'avatar-update'}
          title={'Обновить аватар'}
          children={
            <>
              <input className="form__input" type="url" id="input-avatar-link" aria-label="ссылка" placeholder="Ссылка на аватар пользователя" name="link" required />
                <span className="input-avatar-link-error form__input-error"></span>
            </>
          }
          buttonLabel={'Сохранить'}
          isOpen = {isEditAvatarPopupOpen}
          onClose = {closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>        
      </div>

      
  
    </div>
  );
}

export default App;
