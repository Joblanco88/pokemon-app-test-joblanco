import React, { useState, useEffect } from 'react';
import { fetchAllPokemon } from '../helpers/api';

export default function List() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const pokemon = await fetchAllPokemon();
      const { results } = pokemon;
      setPokemonList(results);
    };
  
    getData();
  }, []);

  console.log(pokemonList);
  return (
    <div>
      {pokemonList.map((pokemon) => (
        <div key={pokemon.name}>
          <h1>{pokemon.name}</h1>
        </div>
      ))}
    </div>
  );
}
