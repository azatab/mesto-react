import React from 'react'
import api from '../utils/api'
import Card from './Card'

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUserName] = React.useState(null)
  const [userDescription, setUserDescription] = React.useState(null)
  const [userAvatar, setUserAvatar] = React.useState(null)
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getCards(), api.getUserInfo()])
    .then(([cardsObj, userData]) => {
      setUserName(userData.name)
      setUserDescription(userData.about)
      setUserAvatar(userData.avatar)
      setCards(cardsObj)
    })
    .catch((err) => console.log(err))
  }, [])

  
  
  return (
    <main>
      <section className="profile page__section">
         <div className="profile__container">
            <img className="profile__avatar" src={userAvatar} alt="Кусто" />
            <button className="profile__avatar-edit" aria-label="редактировать аватар" onClick={onEditAvatar}></button>
            <div className="profile__info">  
              <div className="profile__description">
                <h1 className="profile__name">{userName}</h1>
                <button className="button profile__edit-button" type="button" id="profile-edit" aria-label="редактировать профиль" onClick={onEditProfile}></button>  
              </div>
              <p className="profile__job">{userDescription}</p>
            </div>
          </div>
          <button className="button profile__add-button" type="button" aria-label="добавить фото" onClick={onAddPlace}></button> 
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
        {cards.map((card) => <Card key={card._id} card={card} onCardClick={onCardClick}/> )}
        </ul>
      </section>
    </main>
  )
}

export default Main