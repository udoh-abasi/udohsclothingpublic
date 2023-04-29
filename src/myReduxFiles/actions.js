import { createAction } from "@reduxjs/toolkit";

export const cartAction = createAction("cartAction", (clothArray) => {
  return { payload: clothArray };
});
