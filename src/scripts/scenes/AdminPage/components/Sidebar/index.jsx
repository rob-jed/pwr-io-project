import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.scss';

const propTypes = {
  path: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

const links = [
  {
    url: '/add-client',
    text: 'Dodaj osobę',
  },
  {
    url: '/transactions-list',
    text: 'Lista transakcji',
  },
  {
    url: '/add-transaction',
    text: 'Dodaj transakcję',
  },
];

function Sidebar({ path, pathname }) {
  return (
    <ul className="admin-page-sidebar-nav">
      {
        links.map(link => (
          <li
            key={link.text}
            className={`nav-item${pathname.includes(link.url) ? ' active' : ''}`}
          >
            <Link to={`${path}${link.url}`}>
              {link.text}
            </Link>
          </li>
        ))
      }
    </ul>
  );
}

Sidebar.propTypes = propTypes;

export default Sidebar;
