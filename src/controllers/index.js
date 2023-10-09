
const getPokemons = require("./getPokemons");
const getPokemonById = require("./getPokemonById");
const getPokemonByQuery = require("./getPokemonByQuery");
const postPokemon = require("./postPokemon");
const getTypes = require("./getTypes");

const createBulkTypes = require("./createBulkTypes");

module.exports = {
    getPokemons,
    getPokemonById,
    getPokemonByQuery,
    postPokemon,
    getTypes,
    createBulkTypes,
}