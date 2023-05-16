import { configureStore } from "@reduxjs/toolkit";
import { cartReducer, countryStateCityReducer } from "./reducers";

export const store = configureStore({
  reducer: { cartData: cartReducer, countryStateCity: countryStateCityReducer },
});
