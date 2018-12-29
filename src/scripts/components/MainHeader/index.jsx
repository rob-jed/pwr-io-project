import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import LogOutButton from 'components/LogOutButton';

import { isLoggedIn } from 'services/User';
import { route } from 'services/URL';

import './styles.scss';
import Button from "../Button";

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
            <Link to='/'>
              <Button text="Lista" customClass="button-home"/>
            </Link>
          )
        }
      </div>

      <div className="main-content">
        <h1>{title}</h1>

        <div className="buttons-group">
          {
            isLoggedIn() ? <LogOutButton /> : (
              <Link to={route('login')}>
                <Button text="Zaloguj" customClass="button-login" />
              </Link>
            )
          }
        </div>
      </div>
    </header>
  );
}

MainHeader.propTypes = propTypes;
MainHeader.defaultProps = defaultProps;

export default MainHeader;
