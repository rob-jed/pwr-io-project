import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchbarView from './components/SearchbarView';

const propTypes = {
  onChange: PropTypes.func.isRequired,
};

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { onChange } = this.props;
    const { value } = e.target;

    onChange(value);
  }

  render() {
    return <SearchbarView onChange={this.handleChange} />;
  }
}

Searchbar.propTypes = propTypes;

export default Searchbar;
