export const fetchAllPokemon = async () => fetch('https://pokeapi.co/api/v2/pokemon/').then((d) => d.json()).then((r) => r).catch((err) => console.log('A api retornou o erro: ' + err));

export const fetchPokemon = async (pokemon) => fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((d) => d.json()).then((r) => r).catch((err) => console.log('A api retornou o erro: ' + err));