import * as React from 'react';
import GrantContext from './GrantContext';
import { Actions } from 'types';

type RenderProp = (hasAccess: boolean) => JSX.Element;

type Props = {
  do: Actions;
  children: React.ReactNode | RenderProp;
};

const Can = ({ do: actions, children }: Props) => (
  <GrantContext.Consumer>
    {({ canDo, defined }) => {
      const hasAccess = defined(actions) && canDo(actions);

      if (typeof children === 'function') return children(hasAccess);

      return hasAccess ? children : null;
    }}
  </GrantContext.Consumer>
);

export default Can;
