import { useContext } from 'react';
import GrantContext from './GrantContext';

const useCan = actions => {
  const { canDo, defined } = useContext(GrantContext);

  return defined(actions) && canDo(actions);
};

export default useCan;
