

const idExist = (idPokemon) => {
    return ( ( (idPokemon >= 1) && (idPokemon <= 1017) ) || ( (idPokemon >= 10001) && (idPokemon <= 10275) ) );
}
module.exports = idExist;