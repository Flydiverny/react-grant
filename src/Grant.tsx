import * as React from 'react';
import GrantContext from './GrantContext';
import verifyAccess, { normalizeToArray } from './utils/verifyAccess';
import { Actions, Verifier } from 'types';

const extendCanDo = (
  canDo: Verifier,
  isDefined: Verifier,
  grantedAccess: Actions
) => {
  // Verify that all things granted exist
  isDefined(grantedAccess);
  const verifier = verifyAccess(grantedAccess);

  return (actions: Actions) =>
    normalizeToArray(actions).every(
      action => verifier(action) || canDo(action)
    );
};

type Props = {
  accessTo: Actions;
};

const Grant: React.FunctionComponent<Props> = ({ children, accessTo }) => (
  <GrantContext.Consumer>
    {({ canDo, defined, ...rest }) => (
      <GrantContext.Provider
        value={{
          ...rest,
          defined,
          canDo: extendCanDo(canDo, defined, accessTo),
        }}
      >
        {children}
      </GrantContext.Provider>
    )}
  </GrantContext.Consumer>
);

export default Grant;
