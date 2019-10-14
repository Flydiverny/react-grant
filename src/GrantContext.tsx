import * as React from 'react';
import { Actions } from 'types';

export type GrantContextProvidedValues = {
  canDo: (actions: Actions) => boolean;
  defined: (actions: Actions) => boolean;
};

const GrantContext = React.createContext<GrantContextProvidedValues>({
  canDo: () => false,
  defined: () => true,
});

export default GrantContext;
