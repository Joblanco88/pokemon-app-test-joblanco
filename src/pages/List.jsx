import React, { useState, useEffect, useContext } from "react";
import { fetchAllPokemon, fetchPokemon } from "@services/api";
import { getLocalStorage, saveLocalStorage } from "@services/storage";
import Context from "@context/Context";
import Header from "@components/Header";
import PokemonCard from "@components/PokemonCard";
import FavoritePokemonCard from "@components/FavoritePokemonCard";

export default function List() {
  const [pokemonList, setPokemonList] = useState([]);
  const { globalState, setGlobalState } = useContext(Context);

  const getPokeWithIcons = async () => {
    const { results } = await fetchAllPokemon();
    return await Promise.all(
      results.map(async (result) => {
        const {
          sprites: { other },
        } = await fetchPokemon(result.name);
        return {
          ...result,
          sprite: other.dream_world.front_default,
        };
      })
    );
  };

  useEffect(() => {
    const localStorage = getLocalStorage("favorites");
    if (!localStorage) saveLocalStorage("favorites", []);
    setGlobalState({ favorites: localStorage });
    const getData = async () => setPokemonList(await getPokeWithIcons());

    getData();
  }, []);

  return (
    <div className="hero-list">
      <Header title="Lista" />
      {pokemonList?.map((pokemon) => (
        <PokemonCard pokemon={pokemon} pokemonList={pokemonList} />
      ))}
      <div className="favorites-list">
        {globalState.favorites?.map((pokemon) => (
          <FavoritePokemonCard pokemon={pokemon} pokemonList={pokemonList} />
        ))}
      </div>
    </div>
  );
}
