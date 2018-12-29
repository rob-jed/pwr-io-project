import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PrimaryLayout from 'components/PrimaryLayout';
import Searchbar from 'components/Searchbar';

import Filters from './components/Filters';
import ItemsList from './components/ItemsList';

import { setStoreItems } from 'data/store/actions';

import './styles.scss';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const dummyItems = [
  {
    id: 1,
    name: 'Zajebiste BMW Mordo',
    description: 'Typowy pussy magnet',
    seller: 'John Doe',
    sellerDetails: {
      phoneNumber: '111-222-333',
      email: 'xyz@gmail.com',
    },
    carDetails: {
      year: 1992,
      engine: '3.0',
    },
  },
  {
    id: 2,
    name: 'Nowiutkie BMW Od Seby',
    description: 'Gunwno',
    seller: 'John Doe',
    sellerDetails: {
      phoneNumber: '111-222-333',
      email: 'xyz@gmail.com',
    },
    carDetails: {
      year: 1992,
      engine: '3.0',
    },
  },
  {
    id: 3,
    name: 'Astra Twojego starego',
    description: 'Ojciec płakał jak sprzedawał',
    seller: 'John Doe',
    sellerDetails: {
      phoneNumber: '111-222-333',
      email: 'xyz@gmail.com',
    },
    carDetails: {
      year: 1992,
      engine: '3.0',
    },
  },
];

class MainItemsList extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(value) {
    const { dispatch } = this.props;
    let items = [...dummyItems];

    if (value) {
      items = items.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    }

    dispatch(setStoreItems(items));
  }

  render() {
    return (
      <PrimaryLayout
        headerTitle="Komis samochodowy Jędrzejewski &amp; Hadrian"
        sidebar={<Filters />}
        showBackButton={false}
      >
        <div className="list-view-wrapper">
          <Searchbar onChange={this.handleSearch} />
          <ItemsList />
        </div>
      </PrimaryLayout>
    );
  }
}

MainItemsList.propTypes = propTypes;

export default connect()(MainItemsList);
