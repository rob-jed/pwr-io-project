import React, { Component, Suspense, lazy } from 'react';

class AsyncComponent extends Component {
  constructor(props) {
    super(props);

    this.LazyComponent = lazy(() => props.loader);
  }

  renderFallback() {
    return <h1>Chunk loading failed. Please try again</h1>;
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
