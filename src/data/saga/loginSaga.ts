import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { setError, setLoading, setToken } from "../reducers/loginReducer";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload } from "../../Interface";
import { CartsStore } from "../reducers/booksList";

const API_URL = String(import.meta.env.VITE_API_URL);
function* loginDataSaga(action: PayloadAction<LoginPayload>): Generator {
  try {
    const response = yield call(() =>
      axios.post(`${API_URL}/login`, action.payload, {
        headers: {
          "Content-Type": "application/json"
        }
      })
    );
    const data = response.data;
    yield put(setToken(data));
    yield put(CartsStore(data.user && data.user.books.cart));
  } catch (error: unknown) {
    yield put(
      setError(error instanceof Error ? error.message : "Unknown error")
    );
  }
}

export function* watchLoginData() {
  yield takeEvery(setLoading.type, loginDataSaga);
}
