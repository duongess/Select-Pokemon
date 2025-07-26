import { PokemonDetail } from './../../features/poke/model/types';
// shared/store/root-reducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/model/slice";
import PokeReducer from "../../features/poke/model/slice"; // Import Pokémon slice
// Import other feature reducers

export const rootReducer = combineReducers({
  auth: authReducer,
  pokemon: PokeReducer, // Add Pokémon reducer
});

// shared/store/root-saga.ts
import { all, fork } from "redux-saga/effects";
import { authSagas } from "@/features/auth/sagas/auth.sagas";
import { pokemonSagas } from "@/features/poke/sagas/pokemon.sagas"; // Import Pokémon sagas
// Import other feature sagas

export function* rootSaga() {
  yield all([
    fork(authSagas),
    fork(pokemonSagas), // Add Pokémon sagas
    // Add other feature sagas
  ]);
}
