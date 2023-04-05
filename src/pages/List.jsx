import React, { useState, useEffect } from 'react';
import { fetchAllPokemon, fetchPokemon } from '../helpers/api';
import blackHeart from '../images/blackHeartIcon.svg';
import { getLocalStorage, saveLocalStorage } from '../helpers/storage';

export default function List() {
  const [pokemonList, setPokemonList] = useState([]);
  const favoriteIcon = blackHeart;

  useEffect(() => {
    const localStorage = getLocalStorage('favorites');
    if (!localStorage) saveLocalStorage('favorites', []);
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
      setPokemonList(arrayPokemon);
    };
  
    getData();
  }, []);

  const saveFavorites = ({target: {value, alt}}) => {
    const localStorage = getLocalStorage('favorites');

    if (value) {
      pokemonList.filter((pokemon) => pokemon === value);
      saveLocalStorage('favorites', [...pokemonList.filter((pokemon) => pokemon.name === value), ...localStorage]);
      global.alert('Local Storage salvo com sucesso!');
    } else {
      const pokemonName = alt.split(' ');
      const pokeAlt = pokemonName.pop();
      saveLocalStorage('favorites', [...pokemonList.filter((pokemon) => pokemon.name === pokeAlt), ...localStorage]);
      global.alert('Local Storage salvo com sucesso!');
    }
  }

  return (
    <div className="hero-list">
      <header className='header-list'>Lista</header>
      {pokemonList?.map((pokemon) => (
        <div className="pokemon-card" key={pokemon.name}>
          <img className="pokemon-images" src={pokemon.sprite} alt={pokemon.name} />
          <h1>{pokemon.name}</h1>
          <button value={pokemon.name} onClick={ saveFavorites }><img src={ favoriteIcon } alt={`Botão de favoritar do ${pokemon.name}`}/>Favoritar</button>
        </div>
      ))}
      <div className="favorites-list">
        Favoritos
      </div>
    </div>
  );
}
