import { createReducer } from "@reduxjs/toolkit";
import { theCardAction } from "./actions";

const initialState = { cards: [] };

export const cardData = createReducer(initialState, (builder) => {
  builder.addCase(theCardAction, (state, action) => {
    const { payload } = action;
    return { cards: payload };
  });
});
