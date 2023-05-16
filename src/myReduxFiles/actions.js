import { createAction } from "@reduxjs/toolkit";

export const cartAction = createAction("cartAction", (clothArray) => {
  return { payload: clothArray };
});

export const countryStateCityAction = createAction(
  "countryStateCityAction",
  (countryStateCityObject) => {
    return { payload: countryStateCityObject };
  }
);
