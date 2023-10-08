 /*
    Ruta para obtener todos los pokemon 
    TODO: De momento solo los obtiene de la api
    GET: host + /api/pokemons
  */

const axios = require('axios');
const getPropsPokemon = require("../utils/getPropsPokemon");

const LIMIT = 10;
const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemons = async (req, res) =>  {
    try {
        const pokemons = [];
        for (let i=1;i<=LIMIT;i++){
            const response = await axios.get( URL + i);
            const { data } = response;
            pokemons.push(getPropsPokemon(data));
        }
        res.json(pokemons)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
module.exports = getPokemons;