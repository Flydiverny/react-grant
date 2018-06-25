import React from 'react';
import PropTypes from 'prop-types';
import GrantContext from './GrantContext';
import verifyAccess, { normalizeToArray } from './utils/verifyAccess';
import actionsShape from './utils/actionsShape';

const verifyDefined = defined => {
  if (!defined) {
    return () => true;
  }

  const verifier = verifyAccess(defined);

  return actions =>
    normalizeToArray(actions).every(action => {
      if (!verifier(action)) {
        throw new Error(`Unknown action ${action}`);
      }

      return true;
    });
};

const GrantDefinitions = ({ children, defined }) => (
  <GrantContext.Provider value={{ defined: verifyDefined(defined) }}>
    {children}
  </GrantContext.Provider>
);

GrantDefinitions.propTypes = {
  children: PropTypes.node.isRequired,
  defined: actionsShape,
};

GrantDefinitions.defaultProps = {
  defined: null,
};

export default GrantDefinitions;
