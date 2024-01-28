 /*
    Ruta para guardar un pokemon
    POST: host + /api/pokemon
  */
    const camelToSnake = require("../utils/camelToSnake");
    const validate = require("../utils/validation");
    const { Pokemons } = require("../db/connection")
    
    const postPokemon = async (req, res) =>  {
        try {
           const {name, images,hp,attack,defense,speed,height,weight,types}  = req.body;
           
           console.log(req.body);
           
           
           validate({name, images,hp,attack,defense,speed,height,weight,types});
             
           /*Pasa de CamelCase a snake-case */
           const newName = camelToSnake(name);
           
           /*Ingresa los datos a la BD */
            const [newPokemon,isCreated] = await Pokemons.findOrCreate({
                where:{name:newName},
                defaults:{images,hp,attack,defense,speed,height,weight}
            });
  
            if(isCreated){
                newPokemon.addTypes(types)
                return res.json({newPokemon})
            }
            return res.status(409).json({message:"Ya existe este pokemon"})
            
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
    module.exports = postPokemon;