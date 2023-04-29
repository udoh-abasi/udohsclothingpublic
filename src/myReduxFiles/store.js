import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers";

export const store = configureStore({
  reducer: { cartData: cartReducer },
});
