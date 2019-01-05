import React from 'react';
import PropTypes from 'prop-types';

import DropdrownItem from '../DropdownItem';

const propTypes = {
  items: PropTypes.array.isRequired,
  searchValue: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

const defaultProps = {
  searchValue: '',
};

function DropdownItems({ items, searchValue, onSearchChange, onItemClick }) {
  return (
    <div className="dropdown-items-wrapper">
      <div className="dropdown-search">
        <input
          placeholder="Szukaj"
          type="text"
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>
      {
        items && items.length ? (
          <ul className="dropdown-items">
            {
              items.map(item => (
                <DropdrownItem
                  key={item.value}
                  item={item}
                  onItemClick={onItemClick}
                />
              ))
            }
          </ul>
        ) : <span className="no-results">Brak wyników</span>
      }
    </div>
  );
}

DropdownItems.propTypes = propTypes;
DropdownItems.defaultProps = defaultProps;

export default DropdownItems;
