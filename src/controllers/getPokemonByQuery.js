 /*
    Ruta para obtner un pokemon específico por query(nombre)
    GET: host + /api/pokemon/?name=[nombrepokemon]
  */

const axios = require('axios');
const getPropsPokemon = require("../utils/getPropsPokemon");
const camelToSnake = require("../utils/camelToSnake");
const { Pokemons, Types } = require("../db/connection")

const LIMIT = 400;
const URL = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${LIMIT}`;

const getPokemonByQuery = async (req,res) => {
    try {  
        const {name} = req.query;
    
        /**Compruba si lo que viene por name no es un numero */
        if(!isNaN(name)) return res.status(400).json({ message: "Parámetro incorrecto" })
        
        /*Pasa de CamelCase a snake-case */
        const newName = camelToSnake(name)

        let pokemons = [];
        /* Obtiene los pokemons de la BD */
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

        /* Obtiene los pokemons de la Api */
        const { data } = await axios.get( URL );
        const detailPromises = data.results.map(async(pokemon) => {
            const { data } = await axios.get(pokemon.url)
            return getPropsPokemon(data);
        });
        const apiPokemons = await Promise.all(detailPromises);
        pokemons = [...dbPokemons,...apiPokemons ]

        /** Una ves obtenidos buscará todas las ocurrencias con el query ?name */
        const filterPokemons = pokemons.filter( pokemon => pokemon.name.toLocaleLowerCase().includes( newName.trim() )  )
        

        /* Verifica si se encontró el Pokémon y responde en consecuencia */
        if (filterPokemons.length !== 0) return res.json(filterPokemons);
        else return res.status(404).json({ message: "No hay ningún Pokémon con ese nombre" });
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports = getPokemonByQuery;