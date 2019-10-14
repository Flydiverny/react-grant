import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Can from './Can';
import { Actions } from 'types';

const canDo = (actions: Actions) => (WrappedComponent: any) => {
  const CanDo = ({ forwardedRef, ...props }: any) => (
    <Can do={actions}>
      {can => can && <WrappedComponent ref={forwardedRef} {...props} />}
    </Can>
  );

  return CanDo;
};

const canDoWithForwardRef = (actions: Actions) => (WrappedComponent: any) => {
  const CanDo = canDo(actions)(WrappedComponent);

  const ForwardedComponent = React.forwardRef((props: any, ref: any) => (
    <CanDo {...props} forwardedRef={ref} />
  ));

  const name = WrappedComponent.displayName || WrappedComponent.name;
  ForwardedComponent.displayName = `canDo(${name})`;

  hoistNonReactStatics(ForwardedComponent, WrappedComponent);

  return ForwardedComponent;
};

export const test = {
  canDo,
};

export default canDoWithForwardRef;
