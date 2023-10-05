require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
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
const { Pokemon, Types } = sequelize.models;
Pokemon.belongsToMany(Types, {through: "pokemon_types" });
Types.belongsToMany(Pokemon, {through: "pokemon_types" });


module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
 };
 