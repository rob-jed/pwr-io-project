import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddEmployeeButton from './components/AddEmployeeButton';
import UsersList from './components/UsersList';

import { toggleLoader } from 'data/store/actions';
import { removeEmployee } from 'services/APIs';

import { updateModels } from '../../services';

import './styles.scss';

class ManageUsers extends Component {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(value) {
    if (!value) {
      return;
    }

    toggleLoader(true);

    removeEmployee(value)
      .then((response) => {
        if (!response || response.code !== 200) {
          toggleLoader(false);
        }

        return updateModels();
      })
      .then(() => toggleLoader(false));
  }

  render() {
    const { storeModels } = this.props;

    return (
      <div className="admin-manage-users">
        <AddEmployeeButton />
        {
          storeModels && (
            <UsersList users={storeModels.employees} onRemove={this.handleRemove} />
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  storeModels: state.storeModels,
});

export default connect(mapStateToProps)(ManageUsers);
