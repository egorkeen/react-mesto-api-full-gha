import React from "react";

function InfoTooltip(props) {
  return(
    <div className={`popup modal-popup ${props.isOpen ? 'popup_active' : ''}`}>
      <div className="modal-popup__container">
        <img className="modal-popup__image" alt={props.alt} src={props.imgLink} />
        <title className="modal-popup__title">{props.titleText}</title>
        <button className="modal-popup__close-button" onClick={props.onClose} />
      </div>
    </div>
  );
};

export default InfoTooltip;