

/* 
    Controlador auxiliar
    api/types/bulk es solo para llenar la tabla types y generar
    los UUID de los tipos de pokemon
*/

const { Types } = require("../db/connection")

const createBulkTypes = async (req, res) =>  {
    try {
        const { types } = req.body;
        const created = await Types.bulkCreate(types)
        res.json({creado:created})
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports = createBulkTypes;