export const isEmpty = s => {
  if (s && s.length) {
    return s.length === 0;
  }
  return true;
};
