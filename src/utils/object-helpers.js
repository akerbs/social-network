export const updateObjectInArray = (
  items,
  itemId,
  objPropName,
  newObJProps
) => {
  return items.map((u) => {
    if (u[objPropName] === itemId) {
      return { ...u, ...newObJProps };
    }
    return u;
  });
};
