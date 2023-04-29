import { createAction } from "@reduxjs/toolkit";

export const cartAction = createAction("cartAction", (data) => {
  return { payload: data };
});
