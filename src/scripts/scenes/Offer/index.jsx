import React, { Component } from 'react';

import PrimaryLayout from 'components/PrimaryLayout';

import CarDetails from './components/CarDetails';

class Offer extends Component {
  render() {
    return (
      <PrimaryLayout
        headerTitle="Oferta"
        sidebar={<CarDetails />}
      >
        <div className="single-offer">
          Oferta
        </div>
      </PrimaryLayout>
    );
  }
}

export default Offer;
