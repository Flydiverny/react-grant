import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import GrantContext from './GrantContext';
import { Actions } from './types';

const withCan = (WrappedComponent: any) => {
  const WithCan = ({ forwardedRef, ...props }: any) => (
    <GrantContext.Consumer>
      {({ canDo, defined }) => (
        <WrappedComponent
          ref={forwardedRef}
          canDo={(actions: Actions) => defined(actions) && canDo(actions)}
          {...props}
        />
      )}
    </GrantContext.Consumer>
  );

  return WithCan;
};

const withCanForwardRef = (WrappedComponent: any) => {
  const WithCan = withCan(WrappedComponent);

  const ForwardedComponent = React.forwardRef((props: any, ref: any) => (
    <WithCan {...props} forwardedRef={ref} />
  ));

  const name = WrappedComponent.displayName || WrappedComponent.name;
  ForwardedComponent.displayName = `withCan(${name})`;

  hoistNonReactStatics(ForwardedComponent, WrappedComponent);

  return ForwardedComponent;
};

export const test = {
  withCan,
};

export default withCanForwardRef;
