// This helper function returns a Map(), which has the string of each item in the cart as its key, and the number of occurrence of that item, as its value
export const getNumberOfEachItemInCart = (array) => {
  const initialValue = new Map();

  const reduceCallback = (accumulatedValue, currentValue) => {
    return accumulatedValue.set(
      JSON.stringify(currentValue),
      (accumulatedValue.get(JSON.stringify(currentValue)) || 0) + 1
    );
  };

  return array.reduce(reduceCallback, initialValue);
};
