 /*
    Ruta para obtner un pokemon específico por query(nombre)
    GET: host + /api/pokemon/?name=[nombrepokemon]
  */

const axios = require('axios');
const getPropsPokemon = require("../utils/getPropsPokemon");
const camelToSnake = require("../utils/camelToSnake");
const { Pokemons, Types } = require("../db/connection")

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonByQuery = async (req,res) => {
    try {  
        const {name} = req.query;
        
        /*Pasa de CamelCase a snake-case */
        const newName = camelToSnake(name)

        /* Busca los datos del pokemon en la BD */
        const dbPokemon = await Pokemons.findOne({
            where: {name:newName},
            include:{
                model: Types,
                attributes: ["name"],
                as:'types',
                through:{
                    attributes:[]
                }
            }
        });

        /* Guarda en foundPokemon el resultado de la consulta a la BD.
           Sino encontró pokemon en la BD consulta a la api  */
        let foundPokemon = dbPokemon;
        if (!dbPokemon) {
            try {
                /*Consulta a la api */
                const { data } = await axios.get(URL + newName);
                const apiPokemon = getPropsPokemon(data);
                if (apiPokemon) foundPokemon = apiPokemon;
            } catch (apiError) { }
        }

        /* Verifica si se encontró el Pokémon y responde en consecuencia */
        if (foundPokemon) return res.json(foundPokemon);
        else return res.status(404).json({ message: "No hay ningún Pokémon con ese nombre" });
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports = getPokemonByQuery;