import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const propTypes = {
  customClass: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  customClass: '',
  text: '',
  onClick: null,
};

function Button({ customClass, text, onClick }) {
  const buttonClassList = ['button', 'button-primary'];

  if (customClass) {
    buttonClassList.push(customClass);
  }

  return (
    <button className={buttonClassList.join(' ')} onClick={onClick}>
      {text}
    </button>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
