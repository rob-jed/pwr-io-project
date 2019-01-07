import React, { Component } from 'react';
import { connect } from 'react-redux';

import ConfirmationPopup from 'components/ConfirmationPopup';
import AddEmployeeButton from './components/AddEmployeeButton';
import UsersList from './components/UsersList';

import { toggleLoader } from 'data/store/actions';
import { removeEmployee } from 'services/APIs';

import { updateModels } from '../../services';

import './styles.scss';

class ManageUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
  }

  handleRemove(value) {
    if (!value) {
      return;
    }

    this.setState({
      userId: value,
    });
  }

  handleSuccess() {
    const { userId } = this.state;

    if (!userId) {
      return;
    }

    toggleLoader(true);

    removeEmployee(userId)
      .then((response) => {
        this.setState({
          userId: null,
        });

        if (!response || response.code !== 200) {
          return;
        }

        return updateModels();
      })
      .then(() => toggleLoader(false));
  }

  handleFailure() {
    this.setState({
      userId: null,
    });
  }

  render() {
    const { userId } = this.state;
    const { storeModels } = this.props;

    return (
      <div className="admin-manage-users">
        <ConfirmationPopup
          isActive={!!userId}
          question="Jesteś pewny? Tej operacji nie można cofnąć."
          onSuccess={this.handleSuccess}
          onFailure={this.handleFailure}
        />
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
