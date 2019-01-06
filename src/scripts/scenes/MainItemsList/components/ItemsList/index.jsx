import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'components/Button';

import SingleItem from '../SingleItem';

const propTypes = {
  storeItems: PropTypes.arrayOf(PropTypes.object),
  filteredItems: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func.isRequired,
};

const defaultProps = {
  storeItems: null,
};

class ItemsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };

    this.itemsPerPage = 5;

    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    const { page } = this.state;

    this.setState({
      page: page + 1,
    });
  }

  render() {
    const { storeItems, filteredItems } = this.props;

    if (!storeItems) {
      return null;
    }

    const { page } = this.state;
    const items = filteredItems || storeItems;
    const visibleItems = items.slice(0, page * this.itemsPerPage);

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
