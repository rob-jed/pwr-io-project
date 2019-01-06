import React from 'react';

import './styles.scss';

function OfferContent({ offer, contactVisible, onClick }) {
  return (
    <div className="offer-content">
      <div className="offer-price">
        {offer.price}&nbsp;zł
      </div>
      <div className="offer-image">
        <img src={offer.image_url} alt={`${offer.name} foto`}/>
      </div>
      <div className="offer-description">
        {offer.description}
      </div>
      <div className="contact-details">
        <button
          className={`contact-details-button ${contactVisible && 'active'}`}
          onClick={onClick}
        >
          {
            contactVisible ? (
              <React.Fragment>
                <span className="author">Autor: {offer.contact_info.author}</span>
                <span className="number">Numer telefonu: {offer.contact_info.number}</span>
              </React.Fragment>
            ) : (
              <span className="show-details">Pokaż dane kontaktowe</span>
            )
          }
        </button>
      </div>
    </div>
  );
}

export default OfferContent;
