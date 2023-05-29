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

export const guestDataAction = createAction("guestData", (guestData) => {
  return { payload: guestData };
});

export const emailAction = createAction("email", (email) => {
  return { payload: email };
});

export const userLoadingAction = createAction("userLoading", (userLoading) => {
  return { payload: userLoading };
});

export const itemsInCartDuplicateAction = createAction(
  "itemsInCartDuplicate",
  (itemsInCartDuplicate) => {
    return { payload: itemsInCartDuplicate };
  }
);
