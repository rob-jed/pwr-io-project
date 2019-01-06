import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'components/Button';

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
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };

    this.itemsPerPage = 5;

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    const { dispatch, storeItems } = this.props;

    if (!storeItems) {
      dispatch(setStoreItems(dummyItems));
    }
  }

  loadMore() {
    const { page } = this.state;

    this.setState({
      page: page + 1,
    });
  }

  render() {
    const { storeItems } = this.props;

    if (!storeItems) {
      return null;
    }

    const { page } = this.state;
    const visibleItems = storeItems.slice(0, page * this.itemsPerPage);

    return (
      <div className="store-items-list">
        {
          visibleItems.map((item) => {
            const { id } = item;

            return <SingleItem key={id} item={item} />;
          })
        }
        {
          storeItems > visibleItems &&
            <Button text="Załaduj więcej" onClick={this.loadMore} />
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
