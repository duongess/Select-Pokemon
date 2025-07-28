"use client";
import React, { useEffect, useState, useCallback } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import { useAppSelector, useAppDispatch } from "@/shared/hooks/use-store";
import {
  selectPokemons,
  selectPokemon,
} from "@/features/pokemon/model/selectors";
import {
  fetchPokemonsRequest,
  fetchPokemonDetailRequest,
  clearSelectedPokemon,
} from "@/features/pokemon/model/slice";
import PokemonCard from "@/entities/user/components/pokemon-card";
import PokemonForm from "@/entities/user/components/pokemon-form";

interface PokemonSearchProps {
  search: string;
  width?: number;
  height?: number;
  itemHeight?: number;
  itemWidth?: number;
  gap?: number;
}

export default function PokemonList({
    search = "",
    width = 1200,
    height = 600,
    itemHeight = 180,
    itemWidth = 150,
  
  gap = 16,
}: PokemonSearchProps) {
    const dispatch = useAppDispatch();
    const selectedDetail = useAppSelector(selectPokemon);
    const pokemons = useAppSelector(selectPokemons);
    const [activeTab, setActiveTab] = useState<number | null>(null);
    const [columnCount, setColumnCount] = useState(1);

    useEffect(() => {
        dispatch(fetchPokemonsRequest({ offset: 0, limit: 1000 }));
    }, [dispatch]);

    const filteredPokemons = pokemons.filter((p) =>
        p.name.toLowerCase().startsWith(search.toLowerCase())
    );

  const updateColumnCount = useCallback(() => {
    const screenWidth = window.innerWidth;
    const columns = Math.max(
      1,
      Math.floor(screenWidth / (itemWidth + gap))
    );
    setColumnCount(columns);
  }, [itemWidth, gap]);

  useEffect(() => {
    updateColumnCount(); // init
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, [updateColumnCount]);

  const gridWidth = columnCount * (itemWidth + gap);
  const rowCount = Math.ceil(filteredPokemons.length / columnCount);

  const chosenPokemon = (rowIdx: number, colIdx: number) => {
    const index = rowIdx * columnCount + colIdx;
    const pokemon = filteredPokemons[index];
    if (pokemon) {
      setActiveTab(index);
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
        style={{ ...style, padding: `${gap / 2}px`, boxSizing: "border-box" }}
      >
        <button
          onClick={() => chosenPokemon(rowIndex, columnIndex)}
          className={`w-full h-full rounded-lg font-semibold border transition-colors ${
            activeTab === index
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
          }`}
        >
          <PokemonForm pokemon={pokemon} />
        </button>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
        <div className="flex justify-center mt-10">
            <Grid
                columnCount={columnCount}
                columnWidth={itemWidth + gap}
                height={height}
                rowCount={rowCount}
                rowHeight={itemHeight + gap}
                width={width}
            >
                {Cell}
            </Grid>
        </div>
      {selectedDetail && (
        <PokemonCard pokemon={selectedDetail} onClose={handleCloseDetail} />
      )}
    </div>
  );
}
