import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setActiveFilters } from 'data/store/actions';

import './styles.scss';

const propTypes = {
  filter: PropTypes.shape({
    name: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
  activeFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

class SingleFilter extends Component{
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  getUpdatedActiveFilters(filter) {
    const { activeFilters } = this.props;

    const isAlreadyActive = activeFilters.findIndex(activeFilter => activeFilter === filter);

    if (isAlreadyActive === -1) {
      this.setState({
        isActive: true,
      });

      return [...activeFilters, filter];
    }

    const updatedFilters = [...activeFilters];
    updatedFilters.splice(isAlreadyActive, 1);

    this.setState({
      isActive: false,
    });

    return updatedFilters;
  }

  handleOnClick() {
    const {
      filter: {
        name,
      },
      dispatch,
    } = this.props;

    const updatedFilters = this.getUpdatedActiveFilters(name);

    dispatch(setActiveFilters(updatedFilters));
  }

  getFilterClasses() {
    const classes = ['single-filter'];
    const { isActive } = this.state;

    if (isActive) {
      classes.push('active');
    }

    return classes.join(' ');
  }

  render() {
    const { filter } = this.props;
    const { displayName } = filter;

    return (
      <li
        className={this.getFilterClasses()}
        onClick={this.handleOnClick}
      >
        <span className="filter-checkbox" />
          {displayName}
      </li>
    );
  }
}

SingleFilter.propTypes = propTypes;

const mapStateToProps = state => ({
  activeFilters: state.activeFilters,
});

export default connect(mapStateToProps)(SingleFilter);
