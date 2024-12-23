import axios from "axios";
import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  ErrorBooksList,
  LoadBooksList,
  StoreBooksList
} from "../reducers/booksList";

const API_URL = String(import.meta.env.VITE_API_URL);
function* BookListSaga(): Generator {
  try {
    const { token } = yield select((s) => s.token);
    const response = yield call(() =>
      axios.get(`${API_URL}/books`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
    );
    yield put(StoreBooksList(response.data.books));
  } catch (error: unknown) {
    yield put(
      ErrorBooksList(error instanceof Error ? error.message : "Unknown error")
    );
  }
}

export function* watchBookListSaga() {
  yield takeEvery(LoadBooksList.type, BookListSaga);
}
