import React, { useState, useEffect } from 'react';
import { fetchAllPokemon, fetchPokemon } from '../helpers/api';
import blackHeart from '../images/blackHeartIcon.svg';

export default function List() {
  const [pokemonList, setPokemonList] = useState([]);
  const favoriteIcon = blackHeart;

  useEffect(() => {
    const getData = async () => {
      const allPokemon = await fetchAllPokemon();
      const { results } = allPokemon;
      const arrayPokemon = await Promise.all(results.map(async (result) => {
        const eachPokemon = await fetchPokemon(result.name);
        const { dream_world: { front_default }} = eachPokemon.sprites.other;
        return {
          ...result,
          sprite: front_default,
        }
      }));
      console.log(arrayPokemon);
      setPokemonList(arrayPokemon);
    };
  
    getData();
  }, []);

  console.log(pokemonList);
  return (
    <div className="hero-list">
      {pokemonList?.map((pokemon) => (
        <div className="pokemon-card" key={pokemon.name}>
          <img className="pokemon-images" src={pokemon.sprite} alt={pokemon.name} />
          <h1>{pokemon.name}</h1>
          <button><img src={ favoriteIcon } alt="Botão de favoritar"/>Favoritar</button>
        </div>
      ))}
    </div>
  );
}
