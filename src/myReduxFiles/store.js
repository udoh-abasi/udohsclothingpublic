import { configureStore } from "@reduxjs/toolkit";
import {
  cartReducer,
  countryStateCityReducer,
  emailReducer,
  guestDataReducer,
  userLoadingReducer,
} from "./reducers";

export const store = configureStore({
  reducer: {
    cartData: cartReducer,
    countryStateCity: countryStateCityReducer,
    guestData: guestDataReducer,
    email: emailReducer,
    userLoading: userLoadingReducer,
  },
});
