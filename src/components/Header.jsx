import React from "react";
import { Link } from "react-router-dom";

export default function Header({ title }) {
  return (
    <div className="header">
      <h2 id="heading-title">{title}</h2>
      {title === "Lista" ? (
        <Link id="header-link" to="/">
          Back to Home
        </Link>
      ) : (
        <Link id="header-link" to="/list">
          Pokémon
        </Link>
      )}
    </div>
  );
}
