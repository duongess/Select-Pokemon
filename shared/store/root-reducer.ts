// shared/store/root-reducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/model/slice";
import PokeReducer from "../../features/pokemon/model/slice"; // Import Pokémon slice
// Import other feature reducers

export const rootReducer = combineReducers({
  auth: authReducer,
  pokemon: PokeReducer, // Add Pokémon reducer
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
