import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

function SingleItem({ item }) {
  return (
    <div className="single-store-item">
      <Link to={`offer/${item.id}`}>
        <div className="item-photo">
          <img src={item.image_url} alt={`${item.name} foto`} />
        </div>
        <div className="item-data">
          <h3 className="item-name">
            {item.name}
          </h3>
          <span className="item-price">
            {item.price}&nbsp;zł
          </span>
          <ul className="item-details">
            {
              item.details.map(detail => (
                <li key={detail.value}>
                  <span className="item-detail-name">
                    {detail.name}:
                  </span>
                  <span className="item-detail-value">
                    {detail.value}
                    {detail.unit && detail.unit}
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
      </Link>
    </div>
  );
}

export default SingleItem;
