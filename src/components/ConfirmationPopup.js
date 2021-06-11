import React from 'react'
import PopupWithForm from './PopupWithForm'

function ConfirmationPopup ({onClose}) {
  return (
    <PopupWithForm 
      name={'confirm-delete'}
      title={'Вы уверены?'}
      buttonLabel={'Да'}
      onClose = {onClose}
    />
  )
}

export default ConfirmationPopup