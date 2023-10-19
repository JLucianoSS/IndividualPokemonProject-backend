const getPropsPokemon = (pokemon) => {
  /* Obteniendo las propiedades id, name */
  const {
    id,
    forms: [{ name }],
    sprites,
    stats,
    height,
	  weight,
    types,
  } = pokemon;

  /* Obteniendo la img o sprite del pokemon */
  const imgDefault = sprites.other["official-artwork"].front_default;

  /* Obteniendo las stats -> hp, attack, defense y speed */
  const hp = stats.find((p) => p.stat.name === "hp").base_stat;
  const attack = stats.find((p) => p.stat.name === "attack").base_stat;
  const defense = stats.find((p) => p.stat.name === "defense").base_stat;
  const speed = stats.find((p) => p.stat.name === "speed").base_stat;

  /* Obtenidos los types del pokemons */
  const pokemonTypes = types.map((e) => e.type);

  /* Manda las propiedades necesarias */
  return {
    id,
    name,
    images: imgDefault,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    types: pokemonTypes,
  };
};

module.exports = getPropsPokemon;
