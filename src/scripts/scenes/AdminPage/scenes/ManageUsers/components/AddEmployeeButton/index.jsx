import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/Button';

function AddEmployeeButton() {
  return (
    <div className="add-user-wrapper">
      <Link to="/admin/add-employee">
        <Button text="Dodaj pracownika" />
      </Link>
    </div>
  );
}

export default AddEmployeeButton;
