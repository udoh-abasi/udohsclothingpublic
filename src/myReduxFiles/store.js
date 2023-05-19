import { configureStore } from "@reduxjs/toolkit";
import {
  cartReducer,
  countryStateCityReducer,
  guestDataReducer,
} from "./reducers";

export const store = configureStore({
  reducer: {
    cartData: cartReducer,
    countryStateCity: countryStateCityReducer,
    guestData: guestDataReducer,
  },
});
