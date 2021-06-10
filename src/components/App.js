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
import AddPlacePopup from './AddPlacePopup';
//import './App.css';

function App() {
  const [currentUser, setCurrentUser] = React.useState('')
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getCards()])
    .then(([cardsObj]) => {
      setCards(cardsObj)
    })
    .catch((err) => console.log(err))
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id)
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards(state => state.map(c => c._id === card._id ? newCard : c))
    })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(item => {
      setCards(state => state.filter(c => c._id !== card._id))
    })
  }

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

  function handleUpdateAvatar (inputValue) {
    api.setUserAvatar(inputValue)
    .then(data => {
      setCurrentUser(data)
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit (place) {
    api.loadCard(place)
    .then(data => {
      setCards([data, ...cards])
      closeAllPopups()
    })
    .catch(err => console.log(err))
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
            cards = {cards}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            />
          <Footer />
          
          <EditProfilePopup 
            isOpen = {isEditProfilePopupOpen} 
            onClose = {closeAllPopups}
            onUpdateUser = {handleUpdateUser} 
          />

          <EditAvatarPopup 
            isOpen = {isEditAvatarPopupOpen} 
            onClose = {closeAllPopups} 
            onUpdateAvatar = {handleUpdateAvatar}
          />

          <AddPlacePopup 
            isOpen = {isAddPlacePopupOpen}
            onClose = {closeAllPopups}
            onAddPlace = {handleAddPlaceSubmit}
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