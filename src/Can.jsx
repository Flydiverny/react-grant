import React from 'react';
import PropTypes from 'prop-types';
import GrantContext from './GrantContext';

const Can = ({ do: actions, children }) => (
  <GrantContext.Consumer>
    {({ canDo, defined }) => (defined(actions) && canDo(actions) ? children : null)}
  </GrantContext.Consumer>
);

Can.propTypes = {
  do: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Can;
