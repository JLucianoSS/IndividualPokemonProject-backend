 /*
    Ruta para obtner un pokemon específico por "id"
    GET: host + /api/pokemon/:idPokemon
  */

const axios = require('axios');
const URL = "https://pokeapi.co/api/v2/pokemon/";
const getPropsPokemon = require("../utils/getPropsPokemon");

const getPokemon = async (req,res) => {
    try {
        const { idPokemon } = req.params;
        const response = await axios.get(URL + idPokemon);
        const {data} = response;
        const pokemon = getPropsPokemon(data)
        res.json( pokemon );

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = getPokemon;