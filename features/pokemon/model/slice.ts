// features/pokemon/model/slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokemonListItem, PokemonDetail, PokemonState } from "./types"; // Import các interfaces từ file types.ts

// Khởi tạo trạng thái ban đầu cho slice Pokémon
const initialState: PokemonState = {
  pokemons: [], // Mảng rỗng ban đầu cho danh sách Pokémon
  selectedPokemon: null, // Không có Pokémon nào được chọn ban đầu
  loadingList: false, // Trạng thái loading cho danh sách Pokémon
  loadingDetail: false, // Trạng thái loading cho chi tiết Pokémon
  error: null, // Không có lỗi ban đầu
  nextOffset: 0, // Offset ban đầu cho việc phân trang
  hasMore: true, // Giả định ban đầu là còn dữ liệu để tải
};

const pokemonSlice = createSlice({
  name: "pokemon", // Tên của slice này
  initialState, // Trạng thái ban đầu
  reducers: {
    // --- Actions cho việc lấy danh sách Pokémon ---
    fetchPokemonsRequest: (
      state,
      action: PayloadAction<{ offset: number; limit: number }> // Payload chứa offset và limit
    ) => {
      state.loadingList = true; // Bắt đầu tải danh sách
      state.error = null; // Xóa lỗi cũ
    },
    fetchPokemonsSuccess: (
      state,
      action: PayloadAction<{ results: PokemonListItem[]; next: string | null }> // Payload chứa danh sách Pokémon và URL của trang tiếp theo
    ) => {
      state.loadingList = false; // Kết thúc tải danh sách
      // Thêm Pokémon mới vào danh sách hiện có
      state.pokemons = [...state.pokemons, ...action.payload.results];
      state.nextOffset = state.pokemons.length; // Cập nhật nextOffset dựa trên số lượng Pokémon đã có
      state.hasMore = action.payload.next !== null; // Cập nhật hasMore dựa trên API response
      state.error = null; // Đảm bảo không có lỗi
    },
    fetchPokemonsFailure: (state, action: PayloadAction<string>) => {
      state.loadingList = false; // Kết thúc tải danh sách
      state.error = action.payload; // Lưu thông báo lỗi
    },

    // --- Actions cho việc lấy chi tiết một Pokémon ---
    fetchPokemonDetailRequest: (state, action: PayloadAction<string | number>) => { // Payload là ID hoặc tên của Pokémon
      state.loadingDetail = true; // Bắt đầu tải chi tiết
      state.error = null; // Xóa lỗi cũ
      state.selectedPokemon = null; // Xóa Pokémon đã chọn trước đó
    },
    fetchPokemonDetailSuccess: (state, action: PayloadAction<PokemonDetail>) => {
      state.loadingDetail = false; // Kết thúc tải chi tiết
      state.selectedPokemon = action.payload; // Lưu thông tin chi tiết Pokémon
      state.error = null; // Đảm bảo không có lỗi
    },
    fetchPokemonDetailFailure: (state, action: PayloadAction<string>) => {
      state.loadingDetail = false; // Kết thúc tải chi tiết
      state.error = action.payload; // Lưu thông báo lỗi
      state.selectedPokemon = null; // Đảm bảo không có Pokémon nào được chọn nếu có lỗi
    },

    // --- Action để xóa chi tiết Pokémon khi đóng modal/dialog ---
    clearSelectedPokemon: (state) => {
      state.selectedPokemon = null;
    },
  },
});

// Export các action creators để sử dụng trong sagas hoặc components
export const {
  fetchPokemonsRequest,
  fetchPokemonsSuccess,
  fetchPokemonsFailure,
  fetchPokemonDetailRequest,
  fetchPokemonDetailSuccess,
  fetchPokemonDetailFailure,
  clearSelectedPokemon,
} = pokemonSlice.actions;

// Export reducer để thêm vào Redux store
export default pokemonSlice.reducer;
