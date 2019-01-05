import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.scss';

const propTypes = {
  isLoaderActive: PropTypes.bool,
};

const defaultProps = {
  isLoaderActive: false,
};

function LoaderOverlay({ isLoaderActive }) {
  const classList = ['loader-overlay'];

  if (isLoaderActive) {
    classList.push('active');
  }

  return (
    <div className={classList.join(' ')}>
      <span className="spinner" />
    </div>
  );
}

LoaderOverlay.propTypes = propTypes;
LoaderOverlay.defaultProps = defaultProps;

const mapStateToProps = state => ({
  isLoaderActive: state.isLoaderActive,
});

export default connect(mapStateToProps)(LoaderOverlay);
