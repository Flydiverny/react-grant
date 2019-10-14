import { Actions, Action } from './types';

export const normalizeToArray = (arrayOrStr: Actions) =>
  !Array.isArray(arrayOrStr) ? arrayOrStr.split(' ') : arrayOrStr;

const accessVerifier = (grantedActions: Actions = '') => {
  const grants = normalizeToArray(grantedActions);

  return (action: Action): boolean => grants.includes(action);
};

export default accessVerifier;
