import { createReducer } from "@reduxjs/toolkit";
import { cartAction } from "./actions";

// const initialState = localStorage.getItem("myCart") || [];
const initialState = [];

export const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase(cartAction, (state, action) => {
    const { payload } = action;
    return payload;
  });
});
