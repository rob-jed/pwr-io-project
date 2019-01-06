import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const propTypes = {
  details: PropTypes.arrayOf(PropTypes.object),
};

function OfferDetails({ details }) {
  return (
    <React.Fragment>
      <h2 className="offer-details-header">Szczegóły samochodu: </h2>
      <ul className="offer-details">
        {
          details.map(detail => (
            <li key={detail.value}>
              <span className="detail-name">
                {detail.name}:
              </span>
              <span className="detail-value">
                {detail.value}
              </span>
            </li>
          ))
        }
      </ul>
    </React.Fragment>
  );
};

OfferDetails.propTypes = propTypes;

export default OfferDetails;
