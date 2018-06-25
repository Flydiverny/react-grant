import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Can from './Can';

const canDo = actions => WrappedComponent => {
  // eslint-disable-next-line react/prop-types
  const CanDo = ({ forwardedRef, ...props }) => (
    <Can do={actions}>
      <WrappedComponent ref={forwardedRef} {...props} />
    </Can>
  );

  return CanDo;
};

const canDoWithForwardRef = actions => WrappedComponent => {
  // eslint-disable-next-line react/prop-types
  const CanDo = canDo(actions)(WrappedComponent);

  const forwardRef = (props, ref) => <CanDo {...props} forwardedRef={ref} />;

  const name = WrappedComponent.displayName || WrappedComponent.name;
  forwardRef.displayName = `canDo(${name})`;

  hoistNonReactStatics(canDo, WrappedComponent);

  return React.forwardRef(forwardRef);
};

export const test = {
  canDo,
};

export default canDoWithForwardRef;
