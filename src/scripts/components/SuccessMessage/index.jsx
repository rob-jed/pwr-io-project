import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const propTypes = {
  message: PropTypes.string.isRequired,
};

function SuccessMessage({ message }) {
  return (
    <div className="app-success-message">
      {message}
    </div>
  );
}

SuccessMessage.propTypes = propTypes;

export default SuccessMessage;
