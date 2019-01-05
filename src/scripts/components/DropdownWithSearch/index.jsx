import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ActiveItem from './components/ActiveItem';
import DropdownItems from './components/DropdownItems';

import './styles.scss';

const propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  label: '',
  placeholder: 'Wybierz jedną z opcji',
};

class DropdownWithSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: false,
      activeItem: '',
      filteredItems: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleWrapperClick = this.handleWrapperClick.bind(this);
  }

  getWrapperClassList() {
    const { isOpened } = this.state;
    const classList = ['dropdown-with-search'];

    if (isOpened) {
      classList.push('active');
    }

    return classList.join(' ');
  }

  handleWrapperClick() {
    const { isOpened } = this.state;

    if (isOpened) {
      return;
    }

    this.setState({
      isOpened: true,
    });
  }

  handleBlur(e) {
    const { isOpened } = this.state;

    if (!isOpened) {
      return;
    }

    const { currentTarget } = e;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.setState({ isOpened: false });
      }
    }, 0);
  }

  handleChange(text, value) {
    const { activeItem } = this.state;
    const { name, onChange } = this.props;

    if (activeItem === text) {
      this.setState({
        activeItem: '',
        isOpened: false,
      });

      return;
    }

    this.setState({
      activeItem: text,
      isOpened: false,
    });

    onChange(name, value);
  }

  handleSearch(e) {
    const { value } = e.target;
    const { items } = this.props;

    this.setState({
      searchValue: value,
    });

    if (!value) {
      this.setState({
        filteredItems: null,
      });

      return;
    }

    const filteredItems = items.filter(item => (
      item.text.toLowerCase().includes(value.toLowerCase())
    ));

    this.setState({
      filteredItems,
    });
  }

  render() {
    const { activeItem, searchValue, filteredItems } = this.state;
    const { placeholder, items, label } = this.props;

    return (
      <div
        className={this.getWrapperClassList()}
        onBlur={this.handleBlur}
        onClick={this.handleWrapperClick}
        role="button"
        tabIndex="0"
      >
        {label && <span className="dropdown-label">{label}</span>}
        <ActiveItem activeItem={activeItem} placeholder={placeholder} />
        <DropdownItems
          onItemClick={this.handleChange}
          items={filteredItems ? filteredItems : items}
          searchValue={searchValue}
          onSearchChange={this.handleSearch}
        />
      </div>
    );
  }
}

DropdownWithSearch.propTypes = propTypes;
DropdownWithSearch.defaultProps = defaultProps;

export default DropdownWithSearch;
