import React from 'react';
import PropTypes from 'prop-types';

import MainHeader from 'components/MainHeader';

import './styles.scss';

const propTypes = {
  children: PropTypes.node,
  sidebar: PropTypes.node,
  headerTitle: PropTypes.string,
  showBackButton: PropTypes.bool,
};

const defaultProps = {
  children: null,
  sidebar: null,
  headerTitle: '',
  showBackButton: true,
};

function PrimaryLayout({ children, sidebar, headerTitle, showBackButton }) {
  return (
    <div className="app-wrapper">
      <MainHeader title={headerTitle} showBackButton={showBackButton} />
      <div className="app-sidebar">
        {sidebar}
      </div>
      <div className="app-content">
        {children}
      </div>
    </div>
  );
}

PrimaryLayout.propTypes = propTypes;
PrimaryLayout.defaultProps = defaultProps;

export default PrimaryLayout;
