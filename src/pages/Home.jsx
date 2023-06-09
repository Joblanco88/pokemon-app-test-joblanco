import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import pokemonLogo from "@images/pokemonLogo.png";
import Header from "@components/Header";

export default function Home() {
  const appDescription =
    "Esse app tem como objetivo renderizar uma lista de pokémon e poder interagir com ela, adicionando cada pokémon aos seus favoritos ou removê-los da sua lista.";
  const history = useHistory();
  return (
    <div className="hero-home">
      <Header title="Home" />
      <section className="welcome-home">
        <h1 id="welcomeHeading">Bem Vindo ao App Teste com tema do Pokémon!</h1>
        <img id="pokemonLogo" src={pokemonLogo} alt="logo pokémon" />
        <h3 id="appDescription">{appDescription}</h3>
      </section>

      <section className="button-home">
        <span>Clique no botão ou no Link para começar sua experiência!</span>
        <button type="button" onClick={() => history.push("/list")}>
          Pokémon
        </button>
        <Link to="/list">Pokémon</Link>
      </section>
    </div>
  );
}
