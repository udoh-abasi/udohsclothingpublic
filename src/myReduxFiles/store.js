import { configureStore } from "@reduxjs/toolkit";
import { cardData } from "./reducers";

export const store = configureStore({
  reducer: { cardData },
});
