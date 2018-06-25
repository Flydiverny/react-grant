import React from 'react';
import PropTypes from 'prop-types';
import GrantContext from './GrantContext';
import verifyAccess, { normalizeToArray } from './utils/verifyAccess';
import actionsShape from './utils/actionsShape';

const extendCanDo = (canDo, isDefined, grantedAccess) => {
  // Verify that all things granted exist
  isDefined(grantedAccess);
  const verifier = verifyAccess(grantedAccess);

  return actions => normalizeToArray(actions).every(action => verifier(action) || canDo(action));
};

const Grant = ({ children, accessTo }) => (
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

Grant.propTypes = {
  children: PropTypes.node.isRequired,
  accessTo: actionsShape.isRequired,
};

export default Grant;
