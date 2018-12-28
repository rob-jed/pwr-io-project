import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SingleFilter extends Component{
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange() {
    console.log('Changed');
  }

  render() {
    const { filter } = this.props;
    const { displayName } = filter;

    return (
      <li>{displayName}</li>
    );
  }
}

export default SingleFilter;
