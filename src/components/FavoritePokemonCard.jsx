import React, { useContext } from "react";
import { getLocalStorage, saveLocalStorage } from "@helpers/storage";
import { UseCheckFavoritePoke, UseAlert } from "@helpers/listHelpers";
import Context from "@context/Context";

export default function FavoritePokemonCard({ pokemon, pokemonList }) {
  const { setGlobalState } = useContext(Context);

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
      const checkFavorite = UseCheckFavoritePoke(localStorage, value);
      const filteredPoke = filterPokemon(checkFavorite, localStorage, value);
      saveLocalStorage("favorites", filteredPoke);
      setGlobalState({ favorites: filteredPoke });
      UseAlert(!checkFavorite);
    } else {
      const pokemonName = alt.split(" ").pop();
      const checkFavorite = UseCheckFavoritePoke(localStorage, pokemonName);
      const filteredPoke = filterPokemon(checkFavorite, localStorage, pokemonName);
      saveLocalStorage("favorites", filteredPoke);
      setGlobalState({ favorites: filteredPoke });
      UseAlert(!checkFavorite);
    }
  };

  return (
    <div
      className="pokemon-card"
      data-testid="card-pokemon-favorites"
      key={pokemon.name}
    >
      <img className="pokemon-image" src={pokemon.sprite} alt={pokemon.name} />
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
  );
}
