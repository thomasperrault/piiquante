//Importation du package HTTP pour création d'un serveur
const http = require('http');
//Importation de l'application
const app = require('./app');


//Fonction normalizePort renvoie un port valide
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//Information pour dire à l'application express sur quel port elle tourne
const port = normalizePort(process.env.PORT ||'3000');
app.set('port', port);

//Recherche les différentes erreurs et les gère. Enregistrée ensuite dans le serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//Fonction exécutée à chaque appel vers le serveur - La fonction reçoit req et res en arguments via la fonction 'app'
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//Serveur écoute le port donné dans la constante "port"
server.listen(port);