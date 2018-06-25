import React from 'react';

const GrantContext = React.createContext({
  canDo: () => false,
  defined: () => true,
});

export default GrantContext;
