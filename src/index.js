// var Hapi = require('hapi');
import Hapi from 'hapi';


const server = new Hapi.Server();
server.connection({
    port: 8000
});


server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {

        reply('hello, world');
    }
});


server.start(function (err) {
    
    if (err) {
        throw err;
    }
    
    console.log('Server running at ' + server.info.uri);
});
