import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';

import Route from 'components/AuthRoute';
import AsyncComponent from 'components/AsyncComponent';
import PrimaryLayout from 'components/PrimaryLayout';
import { getModels } from 'services/APIs';

import Sidebar from './components/Sidebar';
import { getTitleFromPathname } from './services';

import { setStoreModels, toggleLoader } from 'data/store/actions';

class AdminPage extends Component {
  constructor(props) {
    super(props)

    this.createRoutesComponents();
  }

  componentDidMount() {
    const { dispatch, storeModels } = this.props;

    if (!storeModels) {
      dispatch(toggleLoader(true));

      getModels()
        .then((response) => {
          if (!response || response.error) {
            return;
          }

          dispatch(setStoreModels(response));
          dispatch(toggleLoader(false));
        })
    }
  }

  createRoutesComponents() {
    this.AddClient = props => (
      <AsyncComponent
        key="add-client"
        loader={import('scenes/AdminPage/scenes/AddClient')}
        {...props}
      />
    );

    this.TransactionsList = props => (
      <AsyncComponent
        key="transactions-list"
        loader={import('scenes/AdminPage/scenes/TransactionsList')}
        {...props}
      />
    );

    this.AddTransaction = props => (
      <AsyncComponent
        key="add-transactions"
        loader={import('scenes/AdminPage/scenes/AddTransaction')}
        {...props}
      />
    );

    this.ManageUsers = props => (
      <AsyncComponent
        key="add-transactions"
        loader={import('scenes/AdminPage/scenes/ManageUsers')}
        {...props}
      />
    );

    this.AddEmployee = props => (
      <AsyncComponent
        key="add-employee"
        loader={import('scenes/AdminPage/scenes/AddEmployee')}
        {...props}
      />
    );

    this.EditEmployee = props => (
      <AsyncComponent
        key="add-employee"
        loader={import('scenes/AdminPage/scenes/EditEmployee')}
        {...props}
      />
    );
  }

  render() {
    const { path, location: { pathname } } = this.props;

    return (
      <PrimaryLayout
        headerTitle={getTitleFromPathname(pathname)}
        sidebar={<Sidebar path={path} pathname={pathname} />}
      >
        <Switch>
          <Route path={`${path}/add-client`} component={this.AddClient} />
          <Route path={`${path}/transactions-list`} component={this.TransactionsList} />
          <Route path={`${path}/add-transaction`} component={this.AddTransaction} />
          <Route path={`${path}/manage-users`} component={this.ManageUsers} />
          <Route path={`${path}/add-employee`} component={this.AddEmployee} />
          <Route path={`${path}/edit-employee`} component={this.EditEmployee} />
        </Switch>
      </PrimaryLayout>
    )
  }
}

const mapStateToProps = state => ({
  storeModels: state.storeModels,
});

export default connect(mapStateToProps)(AdminPage);
