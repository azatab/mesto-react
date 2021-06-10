import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({...rest}) {
  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
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
        onSubmit = {handleSubmit}
        {...rest}
        //isOpen = {isEditAvatarPopupOpen}
        //onClose = {closeAllPopups}
    />
  )
}

export default EditAvatarPopup