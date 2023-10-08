
/*
    Convierte un nombre en formato "CamelCase" a un nombre en formato "snake_case", donde las palabras 
    están en minúsculas y separadas por guiones.
*/

const camelToSnake = (nombre) => {
  // Divide el nombre en palabras separadas por guiones
  const palabras = nombre.split('-');
  
  // Convierte cada palabra a minúsculas
  const nombreConvertido = palabras.map(palabra => palabra.toLowerCase());
  
  // Une las palabras con guiones nuevamente
  return nombreConvertido.join('-');
}

module.exports = camelToSnake;

