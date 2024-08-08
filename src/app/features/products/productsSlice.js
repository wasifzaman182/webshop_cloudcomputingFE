import { createSlice, current } from "@reduxjs/toolkit";


const initialState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addAllProducts: (state, action) => {
      return [...state.products, ...action.payload.products]
    },
    getAllProducts: (state) => {
      console.log(current(state));
      return state.products;
    }
  },
});

export const { addAllProducts, getAllProducts } = productsSlice.actions;

export default productsSlice.reducer;
