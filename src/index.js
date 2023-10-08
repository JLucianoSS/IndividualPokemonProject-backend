require('dotenv').config();
const { PORT } = process.env
const server = require('./app');
const { conn } = require('./db/connection');


/*
  Cambia a sync({force:true}) si deseas modificar los modelos.
  Ojo: Se borrarán todos los datos y habrá que llenar de 
  nuevo las tablas.
*/
conn.sync({ alter: false }).then(() => {
  console.log('Database Connected');
  server.listen(PORT, () => {
    console.log('%s listening at ' + PORT); // eslint-disable-line no-console
  });
})
.catch(error => console.log(error.message));
