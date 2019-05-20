const server = require('./server');
const stream = require('./stream');

server(stream);
stream.start();