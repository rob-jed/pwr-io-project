import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from 'components/Button';

import { logOut } from 'services/User';

class LogOutButton extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { history } = this.props;

    logOut();
    history.push('/login');
  }

  render() {
    return (
      <Button
        text="Wyloguj"
        customClass="button-logout"
        onClick={this.handleLogout}
      />
    );
  }
}

export default withRouter(LogOutButton);
