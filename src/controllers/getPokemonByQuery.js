 /*
    Ruta para obtner un pokemon específico por query(nombre)
    GET: host + /api/pokemon/?name=[nombrepokemon]
  */

const axios = require('axios');
const getPropsPokemon = require("../utils/getPropsPokemon");
const { Pokemons, Types } = require("../db/connection")

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonByQuery = async (req,res) => {
    try {  
        const {name} = req.query;
        /* Obtiene los datos de la BD */
        const dbPokemon = await Pokemons.findOne({
            where: {name},
            include:{
                model: Types,
                attributes: ["name"],
                through:{
                    attributes:[]
                }
            }
        });
        if(dbPokemon) return res.json( dbPokemon );

        /* Obtiene los datos de la Api */
        const {data} = await axios.get(URL + name);
        const pokemon = getPropsPokemon(data)
        return res.json( pokemon );
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports = getPokemonByQuery;