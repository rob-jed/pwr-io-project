import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

function FormWrapper({ children }) {
  return (
    <div className="login-form-wrapper">
      <div className="login-form-header">
        <div className="header-icon">
          <svg className="j38" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
            <g fill="none">
              <path d="M0 0h24v24H0V0z"></path>
              <path d="M0 0h24v24H0V0z" opacity=".87"></path>
            </g>
            <path
              d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
          </svg>
        </div>
        <h1 className="header-title">Zaloguj się</h1>
      </div>
      <div className="login-form-content">
        {children}
      </div>
    </div>
  );
}

FormWrapper.propTypes = propTypes;
FormWrapper.defaultProps = defaultProps;

export default FormWrapper;
