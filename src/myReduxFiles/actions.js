import { createAction } from "@reduxjs/toolkit";

export const theCardAction = createAction("INITIALCARD", (data) => {
  return { payload: data };
});
