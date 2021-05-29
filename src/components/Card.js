import React from 'react'

function Card ({card, onCardClick}) {
  function handleClick() {
    onCardClick(card)
  }

  return (
    <li className="cards__item" key={card._id}>
      <button className="button cards__delete-button" type="button" aria-label="удалить карточку"></button>
      <img src={card.link} className="cards__image" alt={card.name} onClick={handleClick}/>
      <h2 className="cards__title">{card.name}</h2>
      <div className="cards__like-container">
        <button className="button cards__like-button" type="button" aria-label="поставить лайк"></button>
        <span className="cards__like-counter">{card.likes.length}</span>
      </div>
    </li>
  )
}

export default Card