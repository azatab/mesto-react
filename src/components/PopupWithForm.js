import React from 'react'

function PopupWithForm(props) {
  return (
    <div className= {`${props.isOpen ? `popup popup-${props.name} popup_is-opened` : `popup popup-${props.name}`}`}>
          <div className="popup__container">
            <h2 className="popup__title">{props.title}</h2>
            <form className="form" name={`${props.name}-form`} onSubmit = {props.onSubmit} noValidate>
              <fieldset className="form__fieldset">
                {props.children}
                <button className="button form__save" type="submit" id="save" aria-label="сохранить">{props.buttonLabel}</button>
              </fieldset>
            </form>
            <button className="button popup__close" type="button" id="popup-close" aria-label="закрыть" onClick={props.onClose}></button>
          </div>
        </div>
  )
}

export default PopupWithForm