const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db/connection.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(express.json());

server.use('/api', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;


/**
 - cookieParser: es un middleware de Node.js que se utiliza para analizar y gestionar las cookies en una aplicación web. 

 - bodyParser: middleware de Node.js que se utiliza comúnmente en aplicaciones web para analizar y procesar los cuerpos (bodies) de las solicitudes HTTP entrantes. Su función principal es extraer los datos enviados desde un formulario HTML o una solicitud JSON en el cuerpo de una solicitud HTTP y convertirlos en un objeto JavaScript que sea fácil de manejar en tu aplicación.

 - morgan: es un middleware de registro (logging). Su función principal es registrar información sobre las solicitudes HTTP entrantes en tu aplicación, lo que puede ser muy útil para el diagnóstico, el seguimiento y la supervisión del comportamiento de tu aplicación web.

 */