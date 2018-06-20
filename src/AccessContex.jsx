import React from 'react';

const AccessContex = React.createContext({
  canDo: () => false,
  defined: () => true
});

export default AccessContex;
