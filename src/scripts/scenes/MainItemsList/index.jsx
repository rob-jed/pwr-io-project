import React from 'react';

import PrimaryLayout from 'components/PrimaryLayout';

import Filters from './components/Filters';
import ItemsList from './components/ItemsList';

import './styles.scss';

function MainItemsList() {
  return (
    <PrimaryLayout
      headerTitle="Komis samochodowy Jędrzejewski &amp; Hadrian"
      sidebar={<Filters />}
      showBackButton={false}
    >
      <div className="list-view-wrapper">
        <ItemsList />
      </div>
    </PrimaryLayout>
  );
}

export default MainItemsList;
