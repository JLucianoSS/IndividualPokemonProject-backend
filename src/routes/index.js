const { Router } = require('express');
/* Importacion de Routers */
const { getPokemons, getPokemonById, createBulkTypes ,postPokemon} = require('../controllers');

const router = Router();

/* Configuración de routers*/

router.get("/pokemons",getPokemons);
router.get("/pokemon/:idPokemon",getPokemonById);
// router.get("/pokemons/") query name?=nombre
router.post("/pokemon",postPokemon)
// router.get("/types")

/* 
    /types/bulk es solo para llenar la tabla types y generar
    los UUID
*/
router.post("/types/bulk",createBulkTypes);


module.exports = router;
