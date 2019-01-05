import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  item: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

class DropdownItem extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const { item: { text, value }, onItemClick } = this.props;

    onItemClick(text, value);
  }

  render() {
    const { item } = this.props;

    return (
      <li onClick={this.handleChange}>
        {item.text}
      </li>
    );
  }
}

DropdownItem.propTypes = propTypes;

export default DropdownItem;
