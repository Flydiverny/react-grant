import React from 'react';
import PropTypes from 'prop-types';
import GrantContext from './GrantContext';

const Can = ({ do: actions, children }) => (
  <GrantContext.Consumer>
    {({ canDo, defined }) => {
      const hasAccess = defined(actions) && canDo(actions);

      if (typeof children === 'function') return children(hasAccess);

      return hasAccess ? children : null;
    }}
  </GrantContext.Consumer>
);

Can.propTypes = {
  do: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
};

export default Can;
