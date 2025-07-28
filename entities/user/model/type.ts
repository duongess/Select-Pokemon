// features/pokemon/model/types.ts

/**
 * Interface cho một Pokémon cơ bản trong danh sách.
 * Đây là dữ liệu tối thiểu bạn nhận được từ endpoint /pokemon.
 */
export interface PokemonListItem {
  name: string;
  url: string; // URL để lấy thông tin chi tiết của Pokémon
  id: string; // ID của Pokémon, trích xuất từ URL
  imageUrl: string; // URL hình ảnh sprite của Pokémon
}

/**
 * Interface cho một Type (hệ) của Pokémon.
 */
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

/**
 * Interface cho một Ability (khả năng) của Pokémon.
 */
export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

/**
 * Interface cho một Stat (chỉ số) của Pokémon.
 */
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string; // Ví dụ: 'hp', 'attack', 'defense', 'speed', 'special-attack', 'special-defense'
    url: string;
  };
}

/**
 * Interface cho một Move (chiêu thức) của Pokémon.
 */
export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: Array<{
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }>;
}

/**
 * Interface đầy đủ cho một Pokémon khi bạn fetch chi tiết từ PokeAPI.
 * Dữ liệu này sẽ được lưu trữ trong Redux store khi người dùng chọn xem chi tiết một Pokémon.
 */
export interface PokemonDetail {
  id: number;
  name: string;
  base_experience: number;
  height: number; // Chiều cao (đơn vị: decimetres)
  weight: number; // Cân nặng (đơn vị: hectograms)
  sprites: {
    front_default: string | null;
    back_default: string | null;
    front_shiny: string | null;
    back_shiny: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
      dream_world?: {
        front_default: string | null;
      };
    };
    // Các sprite khác có thể có
  };
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  moves: PokemonMove[];
  // Bạn có thể thêm các trường khác nếu cần từ API (ví dụ: species, forms, game_indices, v.v.)
}

/**
 * Interface cho trạng thái Redux liên quan đến Pokémon.
 * Nó bao gồm danh sách Pokémon (tối giản), Pokémon đang được xem chi tiết,
 * trạng thái loading, lỗi và thông tin phân trang.
 */
export interface PokemonState {
  pokemons: PokemonListItem[]; // Danh sách Pokémon hiển thị trên màn hình chính
  selectedPokemon: PokemonDetail | null; // Pokémon đang được xem chi tiết
  loadingList: boolean; // Trạng thái loading cho danh sách
  loadingDetail: boolean; // Trạng thái loading cho chi tiết Pokémon
  error: string | null;
  nextOffset: number; // Offset cho lần fetch tiếp theo
  hasMore: boolean; // Còn dữ liệu để tải nữa không
}
