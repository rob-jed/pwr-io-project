import React from 'react';

import AsyncComponent from 'components/AsyncComponent';
import { getChunk } from '..';

function loadChunk(name) {
  return props => (
      <AsyncComponent
        key={name}
        loader={getChunk(name)}
        path={props.match.path}
        {...props}
      />
  );
}

export default loadChunk;
