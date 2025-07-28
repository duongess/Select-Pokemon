// entities/model/selectors.ts
import { RootState } from "../../../shared/store/store";

export const pokemons = (state: RootState) => state.pokemon.pokemons;
export const selectPokemon = (state: RootState) => state.pokemon.selectedPokemon;

