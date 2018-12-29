import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const propTypes = {
  onChange: PropTypes.func.isRequired,
};

function SearchbarView({ onChange }) {
  return (
    <div className="searchbar-wrapper">
      <div className="searchbar-input">
        <input type="text" placeholder="Search" onChange={onChange} />
      </div>
    </div>
  );
}

SearchbarView.propTypes = propTypes;

export default SearchbarView;
