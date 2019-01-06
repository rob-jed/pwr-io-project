import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PrimaryLayout from 'components/PrimaryLayout';
import Searchbar from 'components/Searchbar';

import Filters from './components/Filters';
import ItemsList from './components/ItemsList';

import { getStoreItems } from 'services/APIs';
import { setStoreItems, toggleLoader } from 'data/store/actions';

import './styles.scss';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

class MainItemsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredItems: null,
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { storeItems, dispatch } = this.props;

    if (!storeItems) {
      dispatch(toggleLoader(true));

      getStoreItems()
        .then((response) => {
          dispatch(toggleLoader(false));

          if (!response || response.code !== 200) { //eslint-disable-line
            return;
          }

          dispatch(setStoreItems(response.car_list));
        });
    }
  }

  handleSearch(value) {
    if (!value) {
      this.setState({
        filteredItems: null,
      });
    }

    const { storeItems } = this.props;
    let filteredItems = [...storeItems];

    filteredItems = filteredItems.filter(
      item => item.name.toLowerCase().includes(value.toLowerCase())
    );

    this.setState({
      filteredItems,
    });
  }

  render() {
    const { filteredItems } = this.state;

    return (
      <PrimaryLayout
        headerTitle="Komis samochodowy"
        sidebar={<Filters />}
        showBackButton={false}
      >
        <div className="list-view-wrapper">
          <Searchbar onChange={this.handleSearch} />
          <ItemsList filteredItems={filteredItems} />
        </div>
      </PrimaryLayout>
    );
  }
}

MainItemsList.propTypes = propTypes;

const mapStateToProps = state => ({
  storeItems: state.storeItems,
});

export default connect(mapStateToProps)(MainItemsList);
