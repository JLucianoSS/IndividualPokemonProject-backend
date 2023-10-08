
const getPropsPokemon = (pokemon) => {

    /* Obteniendo las propiedades id, name e img */
    const { 
        id, 
        forms:[{name}],
        sprites:{other:{dream_world:{front_default}}}, 
        stats,
        types,
    } = pokemon;
    
    /* Obteniendo las stats -> hp, attack, defense y speed */
    const hp = stats.find((p) => p.stat.name === "hp" ).base_stat;
    const attack = stats.find((p) => p.stat.name === "attack" ).base_stat;
    const defense = stats.find((p) => p.stat.name === "defense" ).base_stat;
    const speed = stats.find((p) => p.stat.name === "speed" ).base_stat;
    
    /* Obtenidos los types del pokemons */
    const pokemonTypes = types.map((e) => e.type.name);

    /* Manda las propiedades necesarias */
    return {id, name, images:front_default, hp, attack, defense, speed ,types:pokemonTypes};
}

module.exports = getPropsPokemon;

