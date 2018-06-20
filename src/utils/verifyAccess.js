export const normalizeToArray = arrayOrStr =>
  !Array.isArray(arrayOrStr) ? arrayOrStr.split(' ') : arrayOrStr;

const accessVerifier = (grantedActions = "") => {
  const grants = normalizeToArray(grantedActions);

  return (action) => grants.includes(action);
}

export default accessVerifier;
