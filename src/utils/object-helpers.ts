export const updateObjectInArray = (
  items: any,
  itemId: any,
  objPropName: any,
  newObJProps: any
) => {
  return items.map((u: any) => {
    if (u[objPropName] === itemId) {
      return { ...u, ...newObJProps };
    }
    return u;
  });
};
