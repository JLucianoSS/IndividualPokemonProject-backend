 /*
    Ruta para obtener todos los pokemon 
    GET: host + /api/pokemons
  */

const axios = require('axios');
const getPropsPokemon = require("../utils/getPropsPokemon");
const { Pokemons, Types } = require("../db/connection");

const LIMIT = 10;
const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemons = async (req, res) =>  {
    try {
        let pokemons = [];
        /* Obtiene los datos de la BD */
        const dbPokemons = await Pokemons.findAll({
            include:{
                model: Types,
                attributes: ["name"],
                through:{
                    attributes:[]
                }
            }
        });
        if(dbPokemons) pokemons = [...dbPokemons];

        /* Obtiene los datos de la Api */
        for (let i=1;i<=LIMIT;i++){
            const {data} = await axios.get( URL + i);
            pokemons.push(getPropsPokemon(data));
        }
        return res.json(pokemons)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
module.exports = getPokemons;