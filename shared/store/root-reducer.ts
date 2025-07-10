// shared/store/root-reducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/model/slice";
// Import other feature reducers

export const rootReducer = combineReducers({
  auth: authReducer,
  // Add other feature reducers
});

// shared/store/root-saga.ts
import { all, fork } from "redux-saga/effects";
import { authSagas } from "@/features/auth/sagas/auth.sagas";
// Import other feature sagas

export function* rootSaga() {
  yield all([
    fork(authSagas),
    // Add other feature sagas
  ]);
}
