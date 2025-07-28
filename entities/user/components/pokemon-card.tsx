import React from "react";
import Image from "next/image";
import { PokemonDetail } from "@/entities/user/model/type";

interface PokemonForm1Props {
  pokemon: PokemonDetail;
  onClose: () => void;
}

export default function PokemonCard({ pokemon, onClose }: PokemonForm1Props) {
  const {
    name,
    height,
    weight,
    base_experience,
    sprites,
    types,
    abilities,
    stats,
  } = pokemon;

  const mainImage =
    sprites.other?.["official-artwork"]?.front_default ||
    sprites.front_default ||
    "/default-pokemon.png";

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-2xl rounded-lg w-full max-w-lg p-6 overflow-y-auto max-h-[90vh] relative">
        {/* Close button góc phải */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold capitalize text-center mb-4">
          {name}
        </h2>

        <div className="flex justify-center mb-4">
          <div className="relative w-48 h-48">
            <Image
              src={mainImage}
              alt={name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p><span className="font-semibold">Chiều cao:</span> {height / 10} m</p>
            <p><span className="font-semibold">Cân nặng:</span> {weight / 10} kg</p>
            <p><span className="font-semibold">Kinh nghiệm cơ bản:</span> {base_experience}</p>
          </div>
          <div>
            <p><span className="font-semibold">Hệ:</span> {types.map((t) => t.type.name).join(", ")}</p>
            <p><span className="font-semibold">Khả năng:</span> {abilities.map((a) => a.ability.name).join(", ")}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Chỉ số:</h3>
          <div className="space-y-2">
            {stats.map((stat) => (
              <div key={stat.stat.name}>
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{stat.stat.name}</span>
                  <span>{stat.base_stat}</span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded h-2">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{ width: `${(stat.base_stat / 200) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nút đóng ở cuối nếu muốn thêm */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
