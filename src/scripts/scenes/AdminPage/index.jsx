import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import Route from 'components/AuthRoute';
import AsyncComponent from 'components/AsyncComponent';
import PrimaryLayout from 'components/PrimaryLayout';

import Sidebar from './components/Sidebar';

import { getTitleFromPathname } from './services';

class AdminPage extends Component {
  constructor(props) {
    super(props)

    this.createRoutesComponents();
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
        </Switch>
      </PrimaryLayout>
    )
  }
}

export default AdminPage;
