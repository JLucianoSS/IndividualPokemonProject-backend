const { Router } = require('express');
const router = Router();

/* Importacion de Routers */
const { getPokemons, getPokemonById, getPokemonByQuery, postPokemon, getTypes } = require('../controllers');

/* Configuración de routers*/
router.get("/pokemons",getPokemons);
router.get("/pokemon/:idPokemon",getPokemonById);
router.get("/pokemon/",getPokemonByQuery); 
router.post("/pokemon",postPokemon);
router.get("/types",getTypes);


module.exports = router;
