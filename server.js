#!/usr/bin/env node

/**
 * Dependências.
 */

var app = require('./config/express')();
var http = require('http');
var debug = require('debug')('hack:server');

/**
 * Configura a porta que será utilizada pelo Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Cria o servidor HTTP.
 */

var server = http.createServer(app);

/**
 * Escute a porta do servidor para log.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normaliza o valor da porta.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Evento de error no servidor HTTP.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // Tratamento de erros especificos.
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' é necessário privilégios de administrador');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' está em uso');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Evento de log do servidor HTTP.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Escutando na porta: ' + bind);
}
