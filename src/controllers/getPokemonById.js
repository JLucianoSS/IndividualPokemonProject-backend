 /*
    Ruta para obtner un pokemon específico por "id"
    GET: host + /api/pokemon/:idPokemon
  */

const axios = require('axios');
const getPropsPokemon = require("../utils/getPropsPokemon");
const isUUID =  require("../utils/isUUID");
const idExist =  require("../utils/idExist");
const { Pokemons, Types } = require("../db/connection")

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonById = async (req,res) => {
    try {
        const { idPokemon } = req.params;
        /* Busca  los datos del pokemon en la BD */
        if(isUUID(idPokemon)){
            const dbPokemon = await Pokemons.findByPk(idPokemon,{
                include:{
                    model: Types,
                    attributes: ["name"],
                    through:{
                        attributes:[]
                    }
                }
            });
            return res.json( dbPokemon );
        }
        /* Busca los datos del pokemon en la Api */
        if ( idExist(idPokemon)){
            const {data} = await axios.get(URL + idPokemon);
            const pokemon = getPropsPokemon(data)
            return res.json( pokemon );
        }
        /*Sino encuentra ningun pokemon con ese id */
        return res.status(404).json( {message:'No hay ningún pokemon con ese id'} );
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports = getPokemonById;