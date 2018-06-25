import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import AccessContex from './AccessContex';

const withCan = WrappedComponent => {
  // eslint-disable-next-line react/prop-types
  const WithCan = ({ forwardedRef, ...props }) => (
    <AccessContex.Consumer>
      {({ canDo, defined }) => (
        <WrappedComponent
          ref={forwardedRef}
          canDo={actions => defined(actions) && canDo(actions)}
          {...props}
        />
      )}
    </AccessContex.Consumer>
  );

  return WithCan;
};

const withCanForwardRef = WrappedComponent => {
  const WithCan = withCan(WrappedComponent);

  const forwardRef = (props, ref) => <WithCan {...props} forwardedRef={ref} />;

  const name = WrappedComponent.displayName || WrappedComponent.name;
  forwardRef.displayName = `withCan(${name})`;

  hoistNonReactStatics(WithCan, WrappedComponent);

  return React.forwardRef(forwardRef);
};

export const test = {
  withCan,
};

export default withCanForwardRef;
