import { createReducer } from "@reduxjs/toolkit";
import {
  cartAction,
  countryStateCityAction,
  emailAction,
  guestDataAction,
  itemsInCartDuplicateAction,
  userLoadingAction,
} from "./actions";

// const initialState = localStorage.getItem("myCart") || [];
const initialState = [];

export const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase(cartAction, (state, action) => {
    const { payload } = action;
    return payload;
  });
});

export const countryStateCityReducer = createReducer({}, (builder) => {
  builder.addCase(countryStateCityAction, (state, action) => {
    const { payload } = action;
    return payload;
  });
});

export const guestDataReducer = createReducer("", (builder) => {
  builder.addCase(guestDataAction, (state, action) => {
    const { payload } = action;
    return payload;
  });
});

export const emailReducer = createReducer("", (builder) => {
  builder.addCase(emailAction, (state, action) => {
    const { payload } = action;
    return payload;
  });
});

export const userLoadingReducer = createReducer(true, (builder) => {
  builder.addCase(userLoadingAction, (state, action) => {
    const { payload } = action;
    return payload;
  });
});

export const itemsInCartDuplicateReducer = createReducer([], (builder) => {
  builder.addCase(itemsInCartDuplicateAction, (state, action) => {
    const { payload } = action;
    return payload;
  });
});
