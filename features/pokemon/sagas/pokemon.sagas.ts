// features/pokemon/sagas/pokemon.saga.ts
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPokemonsRequest,
  fetchPokemonsSuccess,
  fetchPokemonsFailure,
  fetchPokemonDetailRequest,
  fetchPokemonDetailSuccess,
  fetchPokemonDetailFailure,
} from "../model/slice"; // Import các actions từ pokemonSlice
import { PokemonListItem, PokemonDetail } from "../model/types"; // Import các interfaces

// Hàm giả lập gọi API để lấy danh sách Pokémon
// Trong một ứng dụng thực tế, bạn sẽ có một service riêng để gọi API
async function getPokemonsApi(offset: number, limit: number): Promise<{ results: PokemonListItem[]; next: string | null }> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  // Chuyển đổi dữ liệu từ API để phù hợp với PokemonListItem
  const pokemons: PokemonListItem[] = data.results.map((p: any) => ({
    name: p.name,
    url: p.url,
    id: p.url.split('/').filter(Boolean).pop(), // Trích xuất ID từ URL
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.url.split('/').filter(Boolean).pop()}.png`
  }));

  return { results: pokemons, next: data.next };
}

// Hàm giả lập gọi API để lấy chi tiết một Pokémon
async function getPokemonDetailApi(idOrName: string | number): Promise<PokemonDetail> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}/`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  // Chuyển đổi dữ liệu từ API để phù hợp với PokemonDetail
  // Đây là một ví dụ đơn giản, bạn có thể cần xử lý phức tạp hơn tùy thuộc vào cấu trúc API
  const pokemonDetail: PokemonDetail = {
    id: data.id,
    name: data.name,
    base_experience: data.base_experience,
    height: data.height,
    weight: data.weight,
    sprites: {
      front_default: data.sprites.front_default,
      back_default: data.sprites.back_default,
      front_shiny: data.sprites.front_shiny,
      back_shiny: data.sprites.back_shiny,
      other: {
        'official-artwork': {
          front_default: data.sprites.other?.['official-artwork']?.front_default || null,
        },
        dream_world: {
          front_default: data.sprites.other?.dream_world?.front_default || null,
        },
      },
    },
    types: data.types,
    abilities: data.abilities,
    stats: data.stats,
    moves: data.moves,
  };

  return pokemonDetail;
}

// Saga xử lý hành động fetchPokemonsRequest
function* handleFetchPokemons(action: PayloadAction<{ offset: number; limit: number }>): Generator<any, void, any> {
  try {
    const { offset, limit } = action.payload;
    const data: { results: PokemonListItem[]; next: string | null } = yield call(getPokemonsApi, offset, limit);
    yield put(fetchPokemonsSuccess(data));
  } catch (error: any) {
    yield put(fetchPokemonsFailure(error.message || "Failed to fetch pokemons."));
  }
}

// Saga xử lý hành động fetchPokemonDetailRequest
function* handleFetchPokemonDetail(action: PayloadAction<string | number>): Generator<any, void, any> {
  try {
    const idOrName = action.payload;
    const pokemonDetail: PokemonDetail = yield call(getPokemonDetailApi, idOrName);
    yield put(fetchPokemonDetailSuccess(pokemonDetail));
  } catch (error: any) {
    yield put(fetchPokemonDetailFailure(error.message || `Failed to fetch detail.`));
  }
}

// Watcher Saga cho Pokémon
export function* pokemonSagas(): Generator<any, void, any> {
  // takeLatest sẽ hủy bỏ các request trước đó nếu có request mới cùng loại đến
  // Điều này hữu ích cho việc tìm kiếm hoặc tải chi tiết để tránh race conditions
  yield takeLatest(fetchPokemonsRequest.type, handleFetchPokemons);
  yield takeLatest(fetchPokemonDetailRequest.type, handleFetchPokemonDetail);
}
