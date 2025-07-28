// features/auth/model/selectors.ts
import { RootState } from "../../../shared/store/store";

export const selectPokemons = (state: RootState) => state.pokemon.pokemons;
export const selectPokemon = (state: RootState) => state.pokemon.selectedPokemon;

