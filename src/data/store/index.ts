import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import booksList from "../reducers/booksList";

const store = configureStore({
  reducer: {
    token: loginReducer,
    books: booksList
  }
});

export default store;
