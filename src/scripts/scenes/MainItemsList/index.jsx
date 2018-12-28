import React from 'react';
import { Link } from 'react-router-dom';

function MainItemsList() {
  return (
    <React.Fragment>
      <h1>Lista samochodów</h1>
      <Link to="/login">
        Login
      </Link>
    </React.Fragment>
  );
}

export default MainItemsList;
