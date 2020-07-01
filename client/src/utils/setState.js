export const updateStateObject = (oldStateObject, updatedStateProperties) => {
  return {
    ...oldStateObject,
    ...updatedStateProperties
  };
};
