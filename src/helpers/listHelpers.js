export const UseCheckFavoritePoke = (storage, name) =>
  storage.some((pokemon) => pokemon.name === name);

export const UseAlert = (boolean) =>
  boolean
    ? global.alert("Favorito salvo com sucesso!")
    : global.alert("Favorito removido com sucesso!");
