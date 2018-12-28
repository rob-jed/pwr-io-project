import React from 'react';

import './styles.scss';

function SingleItem({ item }) {
  return (
    <div className="single-store-item">
      <h3 className="item-name">
        {item.name}
      </h3>
    </div>
  );
}

export default SingleItem;
