export const getNumberOfEachItemInCart = (array) => {
  const initialValue = new Map();
  initialValue.get();

  const reduceCallback = (accumulatedValue, currentValue) => {
    const myRet = accumulatedValue.set(
      JSON.stringify(currentValue),
      (accumulatedValue.get(JSON.stringify(currentValue)) || 0) + 1
    );

    return myRet;
  };

  return array.reduce(reduceCallback, initialValue);
};
