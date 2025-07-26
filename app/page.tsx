"use client";
import React from "react";
import { FixedSizeGrid as Grid } from "react-window";

import PokemonForm0 from "@/features/poke/components/pokemon-form-0";
import PokemonForm1 from "@/features/poke/components/pokemon-form-1";
import { selectPokemon, pokemons } from "@/features/poke/model/selectors";
import {
  fetchPokemonsRequest,
  fetchPokemonDetailRequest,
  clearSelectedPokemon,
} from "@/features/poke/model/slice";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-store";

export default function Home() {
  const dispatch = useAppDispatch();
  const pokemonAll = useAppSelector(pokemons);
  const selectedDetail = useAppSelector(selectPokemon);

  const [typedText, setTypedText] = React.useState("");
  const [headerHeight, setHeaderHeight] = React.useState("750px");
  const [activeTab, setActiveTab] = React.useState<number | null>(null);
  const [search, setSearch] = React.useState("");
  const [windowWidth, setWindowWidth] = React.useState<number>(1200);

  const itemWidth = 220;
  const itemHeight = 220;
  const gap = 16;

  React.useEffect(() => {
    dispatch(fetchPokemonsRequest({ offset: 0, limit: 1000 }));
  }, [dispatch]);

  React.useEffect(() => {
    const fullText = "Pokemon Search";
    let current = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, current + 1));
      current++;
      if (current >= fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const newHeight = Math.max(150, 750 - scrollTop);
      setHeaderHeight(`${newHeight}px`);
    };
    if (!selectedDetail) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedDetail]);

  const filteredPokemons = pokemonAll.filter((p) =>
    p.name.toLowerCase().startsWith(search.toLowerCase())
  );

  const columnCount = Math.max(1, Math.floor(windowWidth / (itemWidth + gap)));
  const rowCount = Math.ceil(filteredPokemons.length / columnCount);
  const gridWidth = columnCount * (itemWidth + gap);

  const chosenPokemon = (rowIdx: number, colIdx: number) => {
    const index = rowIdx * columnCount + colIdx;
    setActiveTab(index);
    const pokemon = filteredPokemons[index];
    if (pokemon) {
      dispatch(fetchPokemonDetailRequest(pokemon.name));
    }
  };

  const handleCloseDetail = () => {
    setActiveTab(null);
    dispatch(clearSelectedPokemon());
  };

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex;
    const pokemon = filteredPokemons[index];
    if (!pokemon) return null;

    return (
      <div
        style={{
          ...style,
          padding: `${gap / 1}px`,
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={() => chosenPokemon(rowIndex, columnIndex)}
          className={`w-full h-full rounded-lg font-semibold border transition-colors ${
            activeTab === index
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
          }`}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <PokemonForm0 pokemon={pokemon} />
        </button>
      </div>
    );
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black">
      <header
        className="w-full flex flex-col items-center justify-center sticky top-0 z-20 bg-white dark:bg-black shadow-md transition-all duration-300 ease-in-out"
        style={{ height: headerHeight }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center pt-6 pb-4">
          {typedText}
          <span className="animate-pulse">|</span>
        </h1>
        <input
          type="text"
          placeholder="Tìm kiếm Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8"
        />
      </header>

      <div className="w-full flex flex-col items-center">
        <div style={{ width: "100%", overflowX: "auto" }}>
          <div style={{ width: gridWidth, margin: "100px auto" }}>
            <Grid
              columnCount={columnCount}
              columnWidth={itemWidth + gap}
              height={600}
              rowCount={rowCount}
              rowHeight={itemHeight + gap}
              width={gridWidth}
            >
              {Cell}
            </Grid>
          </div>
        </div>

        {selectedDetail && (
          <PokemonForm1
            pokemon={selectedDetail}
            onClose={handleCloseDetail}
          />
        )}
      </div>
    </div>
  );
}
