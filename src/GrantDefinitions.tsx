import * as React from 'react';
import GrantContext from './GrantContext';
import verifyAccess, { normalizeToArray } from './utils/verifyAccess';
import { Actions } from './types';

const verifyDefined = (defined: Actions) => {
  const verifier = verifyAccess(defined);

  return (actions: Actions) =>
    normalizeToArray(actions).every(action => {
      if (!verifier(action)) {
        throw new Error(`Unknown action ${action}`);
      }

      return true;
    });
};

export interface Props {
  defined?: Actions;
  children: JSX.Element;
}

const GrantDefinitions = ({ children, defined = [] }: Props) => (
  <GrantContext.Provider
    value={{ defined: verifyDefined(defined), canDo: () => false }}
  >
    {children}
  </GrantContext.Provider>
);

export default GrantDefinitions;
