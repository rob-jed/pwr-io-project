import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const propTypes = {
  message: PropTypes.string.isRequired,
};

function ErrorMessage({ message }) {
  return (
    <div className="app-error-message">
      {message}
    </div>
  );
}

ErrorMessage.propTypes = propTypes;

export default ErrorMessage;
