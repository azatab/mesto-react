import React from 'react'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Card ({card, onCardClick}) {
  const currentUser = React.useContext(CurrentUserContext)
  
  const isOwn = card.owner._id === currentUser._id
  const cardDeleteButtonClassName = (
    `button ${isOwn ? 'cards__delete-button' : 'cards__delete-button_hidden'}`
  )
  
  const isLiked = card.likes.some(item => item._id === currentUser._id)
  const cardLikeButtonClassName = (
    `button cards__like-button ${isLiked ? 'cards__like-button-active' : ''}`
  )

  function handleClick() {
    onCardClick(card)
  }

  return (
    <li className="cards__item" key={card._id}>
      <button className={cardDeleteButtonClassName} type="button" aria-label="удалить карточку"></button>
      <img src={card.link} className="cards__image" alt={card.name} onClick={handleClick}/>
      <h2 className="cards__title">{card.name}</h2>
      <div className="cards__like-container">
        <button className={cardLikeButtonClassName} type="button" aria-label="поставить лайк"></button>
        <span className="cards__like-counter">{card.likes.length}</span>
      </div>
    </li>
  )
}

export default Card