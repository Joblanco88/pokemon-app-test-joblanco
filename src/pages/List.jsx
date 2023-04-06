import React, { useState, useEffect, useContext } from "react";
import { fetchAllPokemon, fetchPokemon } from "../helpers/api";
import blackHeart from "../images/blackHeartIcon.svg";
import whiteHeart from "../images/whiteHeartIcon.svg";
import { getLocalStorage, saveLocalStorage } from "../helpers/storage";
import Context from "../context/Context";
import { Link } from "react-router-dom";

export default function List() {
  const [pokemonList, setPokemonList] = useState([]);
  const { globalState, setGlobalState } = useContext(Context);

  useEffect(() => {
    const localStorage = getLocalStorage("favorites");
    if (!localStorage) saveLocalStorage("favorites", []);
    setGlobalState({ favorites: localStorage });
    const getData = async () => {
      const allPokemon = await fetchAllPokemon();
      const { results } = allPokemon;
      const arrayPokemon = await Promise.all(
        results.map(async (result) => {
          const eachPokemon = await fetchPokemon(result.name);
          const {
            dream_world: { front_default },
          } = eachPokemon.sprites.other;
          return {
            ...result,
            sprite: front_default,
          };
        })
      );
      setPokemonList(arrayPokemon);
    };

    getData();
  }, []);

  const setFavorites = ({ value, alt }) => {
    const localStorage = getLocalStorage("favorites");
    console.log(value);
    console.log(alt);
    if (value) {
      const boolean = localStorage.some((pokemon) => pokemon.name === value);
      if (boolean) {
        const array = localStorage.filter((pokemon) => pokemon.name !== value);
        saveLocalStorage("favorites", array);
        setGlobalState({ favorites: array });
        global.alert("Favorito removido com sucesso!");
      } else {
        const array = [
          ...pokemonList.filter((pokemon) => pokemon.name === value),
          ...localStorage,
        ];
        saveLocalStorage("favorites", array);
        setGlobalState({ favorites: array });
        global.alert("Favorito salvo com sucesso!");
      }
    } else {
      const pokemonName = alt?.split(" ");
      const pokeAlt = pokemonName?.pop();
      const boolean = localStorage.some((pokemon) => pokemon.name === pokeAlt);
      if (boolean) {
        const array = localStorage.filter(
          (pokemon) => pokemon.name !== pokeAlt
        );
        saveLocalStorage("favorites", array);
        setGlobalState({ favorites: array });
        global.alert("Favorito removido com sucesso!");
      } else {
        const array = [
          ...pokemonList.filter((pokemon) => pokemon.name === pokeAlt),
          ...localStorage,
        ];
        saveLocalStorage("favorites", array);
        setGlobalState({ favorites: array });
        global.alert("Favorito salvo com sucesso!");
      }
    }
  };
  return (
    <div className="hero-list">
      <header className="header-list">
        <h2 id="heading-list">Lista</h2>
        <Link id="linkToHome" to="/">
          Back to Home
        </Link>
      </header>
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
