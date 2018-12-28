import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const propTypes = {
  title: PropTypes.string,
  showBackButton: PropTypes.bool,
};

const defaultProps = {
  title: '',
  showBackButton: true,
};

function MainHeader({ title, showBackButton }) {
  return (
    <header className="app-header">
      <div className="side-wrapper">
        {
          showBackButton && (
            <button>Back</button>
          )
        }
      </div>

      <div className="main-content">
        <h1>{title}</h1>
      </div>
    </header>
  );
}

MainHeader.propTypes = propTypes;
MainHeader.defaultProps = defaultProps;

export default MainHeader;
