 /*
    Ruta para obtener todos los pokemon 
    GET: host + /api/pokemons
  */

const axios = require('axios');
const getPropsPokemon = require("../utils/getPropsPokemon");
const { Pokemons, Types } = require("../db/connection");

const LIMIT = 100;
const URL = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${LIMIT}`;

const getPokemons = async (req, res) =>  {
    try {
        let pokemons = [];
        /* Obtiene los datos de la BD */
        const dbPokemons = await Pokemons.findAll({
            include:{
                model: Types,
                attributes: ["name"],
                as:'types',
                through:{
                    attributes:[]
                }
            }
        });
        if(dbPokemons) pokemons = [...dbPokemons];

        /* Obtiene los datos de la Api */
        const { data } = await axios.get( URL );
        const detailPromises = data.results.map(async(pokemon) => {
            const { data } = await axios.get(pokemon.url)
            return getPropsPokemon(data);
        });
        const apiPokemons = await Promise.all(detailPromises);
        pokemons = [...dbPokemons,...apiPokemons ]

        return res.json(pokemons)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
module.exports = getPokemons;