require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const { Sequelize } = require('sequelize');
const PokemonModel = require('../models/Pokemon');
const TypesModel = require('../models/Types');


const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
   {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   }
);

//Ejecución de los  modelos
PokemonModel(sequelize);
TypesModel(sequelize);


//Relacion de los modelos
const { Pokemons, Types } = sequelize.models;
Pokemons.belongsToMany(Types, {through: "Pokemons_types",as:"types" });
Types.belongsToMany(Pokemons, {through: "Pokemons_types" });


module.exports = {
   Types,
   Pokemons, // para poder importar los modelos así: const { Pokemon, Types } = require('../db/connection');
    conn: sequelize, // para importart la conexión { conn } = require('../db/connection');
 };
 