import { useContext } from 'react';
import GrantContext from './GrantContext';
import { Actions } from './types';

const useCan = (actions: Actions) => {
  const { canDo, defined } = useContext(GrantContext);

  return defined(actions) && canDo(actions);
};

export default useCan;
