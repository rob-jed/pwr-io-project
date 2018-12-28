import React from 'react';

import PrimaryLayout from 'components/PrimaryLayout';

import Filters from './components/Filters';

function MainItemsList() {
  return (
    <PrimaryLayout
      headerTitle="Komis samochodowy Jędrzejewski &amp; Hadrian"
      sidebar={<Filters />}
    >
    </PrimaryLayout>
  );
}

export default MainItemsList;
