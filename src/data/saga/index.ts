import { all, fork } from "redux-saga/effects";
import { watchLoginData } from "./loginSaga";
import { watchBookListSaga } from "./bookListSaga";

export default function* rootSaga() {
  yield all([fork(watchLoginData), fork(watchBookListSaga)]);
}
