import React, { useState, useEffect, useContext } from "react";
import { fetchAllPokemon, fetchPokemon } from "@services/api";
import blackHeart from "@images/blackHeartIcon.svg";
import whiteHeart from "@images/whiteHeartIcon.svg";
import { getLocalStorage, saveLocalStorage } from "@services/storage";
import { UseCheckFavoritePoke, UseAlert } from "@helpers/listHelpers";
import Context from "@context/Context";
import Header from "@components/Header";

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

  const filterPokemon = (checkFavorites, storage, value) => {
    if (checkFavorites) {
      return storage.filter((pokemon) => pokemon.name !== value);
    } else {
      return [
        ...pokemonList.filter((pokemon) => pokemon.name === value),
        ...storage,
      ];
    }
  };

  const setFavorites = ({ value, alt }) => {
    const localStorage = getLocalStorage("favorites");
    if (value) {
      const boolean = UseCheckFavoritePoke(localStorage, value);
      const filteredPoke = filterPokemon(boolean, localStorage, value);
      saveLocalStorage("favorites", filteredPoke);
      setGlobalState({ favorites: filteredPoke });
      UseAlert(!boolean);
    } else {
      const pokemonName = alt.split(" ").pop();
      const boolean = UseCheckFavoritePoke(localStorage, pokemonName);
      const filteredPoke = filterPokemon(boolean, localStorage, pokemonName);
      saveLocalStorage("favorites", filteredPoke);
      setGlobalState({ favorites: filteredPoke });
      UseAlert(!boolean);
    }
  };

  return (
    <div className="hero-list">
      <Header title="Lista" />
      {pokemonList?.map((pokemon) => (
        <div
          className="pokemon-card"
          data-testid="card-pokemon"
          key={pokemon.name}
        >
          <img
            className="pokemon-images"
            src={pokemon.sprite}
            alt={pokemon.name}
          />
          <h1>{pokemon.name}</h1>
          <button
            value={pokemon.name}
            onClick={({ target }) => {
              const localStorage = getLocalStorage("favorites");
              if (!localStorage) saveLocalStorage("favorites", []);
              setFavorites(target);
            }}
          >
            <img
              src={
                globalState.favorites?.some(
                  (favorite) => favorite.name === pokemon.name
                )
                  ? blackHeart
                  : whiteHeart
              }
              alt={`Botão de favoritar do ${pokemon.name}`}
            />
            Favoritar
          </button>
        </div>
      ))}
      <div className="favorites-list">
        {globalState.favorites?.map((pokemon) => (
          <div
            className="pokemon-card"
            data-testid="card-pokemon-favorites"
            key={pokemon.name}
          >
            <img
              className="pokemon-images"
              src={pokemon.sprite}
              alt={pokemon.name}
            />
            <h1>{pokemon.name}</h1>
            <button
              value={pokemon.name}
              data-testid={`unfavorite-${pokemon.name}`}
              onClick={({ target }) => {
                const localStorage = getLocalStorage("favorites");
                if (!localStorage) saveLocalStorage("favorites", []);
                setFavorites(target);
              }}
            >
              Desfavoritar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
