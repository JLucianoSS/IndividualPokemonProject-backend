

const axios = require('axios');
const { Types } = require("../db/connection");

const URL = "https://pokeapi.co/api/v2/type";

const getTypes = async (req,res) => {
    try {
        /*Comprueba si la bd ya tiene los types antes de ingresarlos */
        const count = await Types.count();;
        if(count === 0){
            /* Obtiene los types de la api y los guarda como array de objetos */
            const { data } = await axios.get( URL );
            const typesApi = data.results.map((e) => {
                return { name:e.name };
            });
            /*Guarda el array de objetos en la bd */
            const typesIngresados = await Types.bulkCreate(typesApi)
            return res.json(typesIngresados);
        }
        /* Si la bd ya tiene types solo los obtiene */
        const typesBd = await Types.findAll()
        return res.json(typesBd)
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
module.exports = getTypes;