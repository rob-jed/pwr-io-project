import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <React.Fragment>
      <h1>Login Page</h1>
      <Link to="/">
        Lista samochodów
      </Link>
    </React.Fragment>
  );
}

export default LoginPage;
