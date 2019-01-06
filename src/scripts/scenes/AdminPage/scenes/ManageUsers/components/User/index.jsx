import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/Button';

class User extends Component {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove() {
    const { user: { value }, onRemove } = this.props;

    onRemove(value);
  }

  render() {
    const { user: { text, value } } = this.props;

    return (
      <li className="single-user">
        <div className="user-data">
          {text}
        </div>
        <div className="user-buttons">
          <Link to={{ pathname: `/admin/edit-employee`, userId: value }}>
            <Button text="Edytuj" />
          </Link>
          <Button customClass="remove" text="Usuń" onClick={this.handleRemove}/>
        </div>
      </li>
    );
  }
}

export default User;
