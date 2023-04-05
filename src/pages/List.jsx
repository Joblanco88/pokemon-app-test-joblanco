import React, { useState, useEffect } from 'react';
import { fetchAllPokemon, fetchPokemon } from '../helpers/api';
import blackHeart from '../images/blackHeartIcon.svg';
import { getLocalStorage, saveLocalStorage } from '../helpers/storage';

export default function List() {
  const [pokemonList, setPokemonList] = useState([]);
  const [favoritesPokemon, setFavoritesPokemon] = useState({ favorites: []});
  const favoriteIcon = blackHeart;

  useEffect(() => {
    const localStorage = getLocalStorage('favorites');
    if (!localStorage) saveLocalStorage('favorites', []);
    setFavoritesPokemon({ favorites: localStorage});
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

  const setFavorites = ({target: {value, alt}}) => {
    const localStorage = getLocalStorage('favorites');
    if (value) {
      const boolean = localStorage.some((pokemon) => pokemon.name === value);
      if (boolean) {
        const array = localStorage.filter((pokemon) => pokemon.name !== value);
        saveLocalStorage('favorites', array);
        setFavoritesPokemon({ favorites: array});
        global.alert('Favorito removido com sucesso!');
       } else { 
        const array = [...pokemonList.filter((pokemon) => pokemon.name === value), ...localStorage]
        saveLocalStorage('favorites', array);
        setFavoritesPokemon({ favorites: array});
        global.alert('Favorito salvo com sucesso!');
      }
    } else {
      const pokemonName = alt.split(' ');
      const pokeAlt = pokemonName.pop();
      const boolean = localStorage.some((pokemon) => pokemon.name === pokeAlt);
      if (boolean) {
        const array = localStorage.filter((pokemon) => pokemon.name !== pokeAlt);
        saveLocalStorage('favorites', array);
        setFavoritesPokemon({ favorites: array});
        global.alert('Favorito removido com sucesso!');
      } else {
        const array = [...pokemonList.filter((pokemon) => pokemon.name === pokeAlt), ...localStorage];
        saveLocalStorage('favorites', array);
        setFavoritesPokemon({ favorites: array});
        global.alert('Favorito salvo com sucesso!');
      }
    }
  }
  console.log(favoritesPokemon);
  return (
    <div className="hero-list">
      <header className='header-list'>Lista</header>
      {pokemonList?.map((pokemon) => (
        <div className="pokemon-card" key={pokemon.name}>
          <img className="pokemon-images" src={pokemon.sprite} alt={pokemon.name} />
          <h1>{pokemon.name}</h1>
          <button value={pokemon.name} onClick={ setFavorites }><img src={ favoriteIcon } alt={`Botão de favoritar do ${pokemon.name}`}/>Favoritar</button>
        </div>
      ))}
      <div className="favorites-list">
        {favoritesPokemon.favorites?.map((pokemon) => (
          <div className="pokemon-card" key={pokemon.name}>
            <img className="pokemon-images" src={pokemon.sprite} alt={pokemon.name} />
            <h1>{pokemon.name}</h1>
            <button value={pokemon.name} onClick={ setFavorites }><img src={ favoriteIcon } alt={`Botão de favoritar do ${pokemon.name}`}/>Favoritar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
