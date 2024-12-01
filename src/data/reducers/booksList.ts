/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  books: null,
  cart: []
};

const bookslistSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    StoreBooks: (state, action) => {
      state.books = action.payload;
    },
    AddBook: (state, action) => {
      state.books = [...state.books, action.payload];
    },
    StoreCart: (state: { cart: Array<string> }, action) => {
      state.cart = state.cart.includes(action.payload)
        ? state.cart.filter((e) => e !== action.payload)
        : [...state.cart, action.payload];
    },
    CartsStore: (state, action) => {
      state.cart = action.payload;
    }
  }
});

export const { StoreBooks, StoreCart, CartsStore, AddBook } =
  bookslistSlice.actions;
export default bookslistSlice.reducer;
