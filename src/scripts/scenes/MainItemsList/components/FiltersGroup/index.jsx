import React from 'react';
import PropTypes from 'prop-types';

import SingleFilter from '../SingleFilter';

const propTypes = {
  item: PropTypes.shape({
    groupName: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

function FiltersGroup({ item, onChange }) {
  const { groupName, items } = item;

  return (
    <div className="filters-group">
      <h3 className="filters-title">{groupName}</h3>
      <ul className="filters-list">
        {
          items.map((filter) => {
            const { name } = filter;

            return (
              <SingleFilter
                key={name}
                filter={filter}
                onChange={onChange}
              />
            );
          })
        }
      </ul>
    </div>
  );
}

FiltersGroup.propTypes = propTypes;

export default FiltersGroup;
