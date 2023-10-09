

const validate = ({name, images,hp,attack,defense,speed,height,weight,types}) => {

    if (!name || !images || !hp || !attack || !defense || !speed || !height || !weight || !types){
        throw new Error("Faltan Datos");
    }

    if( (typeof name !== "string") || (typeof images !== "string")){
        throw new Error("Datos incorrectos");
    } 

    // Verifica 'types' como arreglo con tamaño entre 1 y 2
    if (!Array.isArray(types) || types.length < 1 || types.length > 2) {
        throw new Error("No puedes mandar 0 o más de 2 types");
    }

    // Verifica que las demás propiedades sean números enteros
    const propiedadesNumericas = [hp,attack,defense,speed,height,weight];
    for (const propiedad of propiedadesNumericas) {
        if (!Number.isInteger(propiedad)) {
        throw new Error("Datos incorrectos");
        }
    }
}

module.exports = validate;