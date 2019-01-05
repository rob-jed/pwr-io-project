import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  activeItem: PropTypes.string,
  placeholder: PropTypes.string,
};

function ActiveItem({ activeItem, placeholder }) {
  const classList = ['dropdown-active-item'];

  if (activeItem) {
    classList.push('active');
  }

  return (
    <div className={classList.join(' ')}>
      {activeItem ? activeItem : placeholder}
    </div>
  );
};

ActiveItem.propTypes = propTypes;

export default ActiveItem;
