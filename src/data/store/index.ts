import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loginReducer from "../reducers/loginReducer";
import booksList from "../reducers/booksList";
import rootSaga from "../saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    token: loginReducer,
    books: booksList,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
