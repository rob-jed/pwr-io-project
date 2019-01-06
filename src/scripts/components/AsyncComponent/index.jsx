import React, { Component, Suspense, lazy } from 'react';

import LoaderOverlay from 'components/LoaderOverlay';

class AsyncComponent extends Component {
  constructor(props) {
    super(props);

    this.LazyComponent = lazy(() => props.loader);
  }

  renderFallback() {
    return <LoaderOverlay forceActive />;
  }

  render() {
    const { loader, ...restProps } = this.props;
    const { LazyComponent } = this;

    return (
      <Suspense fallback={this.renderFallback()}>
        <LazyComponent {...restProps} />
      </Suspense>
    );
  }
}

export default AsyncComponent;
