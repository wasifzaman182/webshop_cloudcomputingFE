import { createSlice } from "@reduxjs/toolkit";

const storedProducts = [];

const initialState = {
  products: storedProducts,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addAllProducts: (state, action) => {
        const allProducts = action.payload.products;
        console.log('Setting state');
        console.log(allProducts)
        state.products = allProducts;
    },
    getAllProducts: (state) => {
      return state.products;
    }
  },
});

export const { addAllProducts, getAllProducts } = productsSlice.actions;

export default productsSlice.reducer;
