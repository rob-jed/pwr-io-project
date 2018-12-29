import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setStoreItems } from 'data/store/actions';

import SingleItem from '../SingleItem';

const propTypes = {
  storeItems: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func.isRequired,
};

const defaultProps = {
  storeItems: null,
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

class ItemsList extends Component {
  componentDidMount() {
    const { dispatch, storeItems } = this.props;

    if (!storeItems) {
      dispatch(setStoreItems(dummyItems));
    }
  }

  render() {
    const { storeItems } = this.props;

    if (!storeItems) {
      return null;
    }

    return (
      <div className="store-items-list">
        {
          storeItems.map((item) => {
            const { id } = item;

            return <SingleItem key={id} item={item} />;
          })
        }
      </div>
    );
  }
}

ItemsList.propTypes = propTypes;
ItemsList.defaultProps = defaultProps;

const mapStateToProps = state => ({
  storeItems: state.storeItems,
});

export default connect(mapStateToProps)(ItemsList);
