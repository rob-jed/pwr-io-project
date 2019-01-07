import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';

import './styles.scss';

const propTypes = {
  isActive: PropTypes.bool,
  text: PropTypes.string.isRequired,
  successText: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  failureText: PropTypes.string,
};

const defaultProps = {
  isActive: false,
  successText: 'Tak',
  failureText: 'Anuluj',
};

function ConfirmationPopup({
  isActive, question, successText, onSuccess, onFailure, failureText,
}) {
  const wrapperClassList = ['confirmation-popup'];

  if (isActive) {
    wrapperClassList.push('active');
  }

  return (
    <div className={wrapperClassList.join(' ')}>
      <div className="confirmation-popup-content">
        <p>{question}</p>
        <div className="buttons-group">
          <Button text={successText} onClick={onSuccess} customClass="button-success" />
          <Button text={failureText} onClick={onFailure} customClass="button-failure" />
        </div>
      </div>
    </div>
  );
}

ConfirmationPopup.propTypes = propTypes;
ConfirmationPopup.defaultProps = defaultProps;

export default ConfirmationPopup;
