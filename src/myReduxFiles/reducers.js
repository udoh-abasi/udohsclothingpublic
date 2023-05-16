import { createReducer } from "@reduxjs/toolkit";
import { cartAction, countryStateCityAction } from "./actions";

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
