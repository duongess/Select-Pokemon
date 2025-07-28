import React from "react";
import Image from "next/image";
import { PokemonListItem } from "@/entities/user/model/type";

interface PokemonForm0Props {
  pokemon: PokemonListItem;
}


function PokemonForm({ pokemon } : PokemonForm0Props) {
  return (
    <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 rounded-lg shadow p-4 w-48">
      <div className="w-32 h-32 relative mb-2">
        <Image
          src={pokemon.imageUrl || "/file.svg"}
          alt={pokemon.name}
          fill
          className="object-contain rounded"
        />
      </div>
      <div className="text-lg font-semibold text-center capitalize mt-2">
        {pokemon.name}
      </div>
    </div>
  );
} export default PokemonForm;