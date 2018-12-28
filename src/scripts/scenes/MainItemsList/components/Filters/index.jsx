import React, { Component } from 'react';

import FiltersGroup from '../FiltersGroup';

const dummyFilters = [
  {
    groupName: 'Audi',
    items: [
      {
        name: 'a3',
        displayName: 'A3',
      },
      {
        name: 'a4',
        displayName: 'A4',
      },
      {
        name: 'a5',
        displayName: 'A5',
      },
      {
        name: 'a6',
        displayName: 'A6',
      },
    ],
  },
  {
    groupName: 'BMW',
    items: [
      {
        name: 'e36',
        displayName: 'E36',
      },
      {
        name: 'm6',
        displayName: 'M6',
      },
    ],
  },
  {
    groupName: 'Opel',
    items: [
      {
        name: 'astra',
        displayName: 'Astra',
      },
      {
        name: 'corsa',
        displayName: 'Corsa',
      },
      {
        name: 'omega',
        displayName: 'Omega',
      },
    ],
  },
];

class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFilters: [],
    };

    this.filtersList = dummyFilters;

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(value) {
    console.log(value);
  }

  render() {
    if (!this.filtersList) {
      return null;
    }

    return this.filtersList.map((filtersGroup) => {
      const { groupName } = filtersGroup;

      return (
        <FiltersGroup
          key={groupName}
          item={filtersGroup}
          onChange={this.handleOnChange}
        />
      );
    });
  }
}

export default Filters;
