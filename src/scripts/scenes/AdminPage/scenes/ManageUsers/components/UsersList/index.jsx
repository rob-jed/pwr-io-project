import React from 'react';

import User from '../User';

import './styles.scss';

function UsersList({ users, onRemove }) {
  return (
    <ul className="admin-users-list">
      {
        users.map(user => (
          <User key={user.value} user={user} onRemove={onRemove} />
        ))
      }
    </ul>
  );
}

export default UsersList;
