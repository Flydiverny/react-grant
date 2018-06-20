import React from 'react';
import PropTypes from 'prop-types';
import AccessContex from './AccessContex';

const Can = ({ do: actions, children }) => (
  <AccessContex.Consumer>
    {({ canDo }) => canDo(actions) ? children : null}
  </AccessContex.Consumer>
);

Can.propTypes = {
  do: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Can;
