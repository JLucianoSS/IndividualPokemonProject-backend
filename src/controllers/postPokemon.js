 /*
    Ruta para guardar un pokemon
    POST: host + /api/pokemon
  */

    const { Pokemons } = require("../db/connection")
    
    const postPokemon = async (req, res) =>  {
        try {
           const {name, images,hp,attack,defense,speed,height,weight,types}  = req.body;
           
            const [newPokemon,isCreated] = await Pokemons.findOrCreate({
                where:{name},
                defaults:{images,hp,attack,defense,speed,height,weight}
            });

            newPokemon.addTypes(types)
           
            res.json({newPokemon,"isCreated":isCreated})
            
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
    
    
    module.exports = postPokemon;