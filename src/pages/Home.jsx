import React from 'react';
import pokemonLogo from '../images/pokemonLogo.png';

export default function Home() {
  const appDescription = "Esse app tem como objetivo renderizar uma lista de pokémon e poder interagir com ela, adicionando cada pokémon aos seus favoritos ou removê-los da sua lista."
  return (
    <div className="hero-home">

      <header className='header-main'>Home</header>

      <section className="welcome-home">
        <h1 id="welcomeHeading">Bem Vindo ao App Teste com tema do Pokémon!</h1>
        <img id="pokemonLogo" src={ pokemonLogo } alt="logo pokémon" />
        <h3 id="appDescription">{ appDescription }</h3>
      </section>

      <section className="button-home">
        <span>Clique no botão para começar sua experiência!</span>
        <button type="button">Pokémon</button>
      </section>

    </div>
  );
}
