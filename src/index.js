
const server = require('./app');
const { conn } = require('./db/connection');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  console.log('Database Connected');
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
})
.catch(error => console.log(error.message));
