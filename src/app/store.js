import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartMiddleware } from "./features/cart/cartSlice";
import productsSlice from "./features/products/productsSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware),
});
