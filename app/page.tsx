"use client";
import React from "react";
import PokemonList from "@/shared/widgets/ui/pokemon-list";
import { fetchPokemonsRequest } from "@/features/pokemon/model/slice";
import { useAppDispatch } from "@/shared/hooks/use-store";
import { useWindowSize } from "@/shared/hooks/use-window-size";

export default function Home() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = React.useState("");
  const { width, height } = useWindowSize();
  React.useEffect(() => {
    console.log("Fetching pokemons...");
    dispatch(fetchPokemonsRequest({ offset: 0, limit: 1000 }));
  }, [dispatch]);

  return (
    <div className="contener min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Select Your Pokémon</h1>

      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-md"
      />

      <PokemonList
        search={search}
        itemHeight={200}
        itemWidth={180}
        width={width * 0.9}
        height={height * 0.8}
        gap={20}
      />
    </div>
  );
}