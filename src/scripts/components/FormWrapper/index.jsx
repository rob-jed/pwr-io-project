import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const propTypes = {
  customClass: PropTypes.string,
  children: PropTypes.node,
  heading: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

const defaultProps = {
  customClass: '',
  children: null,
  heading: '',
};

function FormWrapper({ customClass, children, heading }) {
  const classList = ['form-wrapper'];

  if (customClass) {
    classList.push(customClass);
  }

  return (
    <div className={classList.join(' ')}>
      {heading && (
        <div className="form-heading">
          {heading}
        </div>
      )}
      <div className="form-content">
        {children}
      </div>
    </div>
  );
}

FormWrapper.propTypes = propTypes;
FormWrapper.defaultProps = defaultProps;

export default FormWrapper;
