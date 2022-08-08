import { configureStore } from "@reduxjs/toolkit";
import usSlice from "./us-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    ui: usSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
