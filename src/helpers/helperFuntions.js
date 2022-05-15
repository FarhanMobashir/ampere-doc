export function checkDb(state, id) {
  const checkData = state.find((item) => item._id === id);
  if (checkData) {
    return true;
  } else {
    return false;
  }
}
