/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BooklistReducer } from "../../Interface";

const initialState: BooklistReducer = {
  booksLoading: false,
  cartLoading: false,
  books: [],
  cart: [],
  bookError: "",
  cartError: ""
};

const API_URL = String(import.meta.env.VITE_API_URL);

export const fetchData: any = createAsyncThunk(
  "books/fetchData",
  async (token: string, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/books`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      console.log({ data });
      return data && data.books ? data.books : data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const bookslistSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    LoadBooksList: (state) => {
      state.booksLoading = true;
    },
    StoreBooksList: (state, action) => {
      state.booksLoading = false;
      state.books = action.payload;
      state.bookError = "";
    },
    ErrorBooksList: (state, action) => {
      state.booksLoading = false;
      state.books = [];
      state.bookError = action.payload;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.booksLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.booksLoading = false;
        state.books = action.payload;
        state.bookError = "";
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.booksLoading = false;
        state.books = [];
        state.bookError = action.payload as string;
      });
  }
});

export const {
  LoadBooksList,
  StoreBooksList,
  ErrorBooksList,
  StoreCart,
  CartsStore,
  AddBook
} = bookslistSlice.actions;
export default bookslistSlice.reducer;
