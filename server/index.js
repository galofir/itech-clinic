'use strict';

const Hapi = require('hapi');
const Path = require('path');
const server = new Hapi.Server();

server.connection({ 
	port: 3000,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, '../..')
        }
    } 
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'project',
                listing: true
            }
        }
    });
});
server.register(require('vision'), (err) => {

    if (err) {
        throw err;
    }
    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: Path.join(__dirname, '../'),
        path: 'app'
    });

     server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.view('index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/clinic1',
        handler: function (request, reply) {
            reply.view('clinic1.html');           
        }
    });

     server.route({
        method: 'GET',
        path: '/clinic2',
        handler: function (request, reply) {
            reply.view('clinic2.html');           
        }
    });
});
   //  server.route({  
   //    method: 'GET',
   //    path: '/app/style/css/{file*}',
   //    handler: {
   //      directory: { 
   //        path: 'app/style/css'
   //      }
   //    }
   //  })
   // server.route({  
   //    method: 'GET',
   //    path: '/app/style/photos/{file*}',
   //    handler: {
   //      directory: { 
   //        path: 'app/style/photos'
   //      }
   //    }
   //  })
   //  server.route({  
   //    method: 'GET',
   //    path: '/node_modules/bootstrap/dist/css/{file*}',
   //    handler: {
   //      directory: { 
   //        path: 'node_modules/bootstrap/dist/css'
   //      }
   //    }
   //  })

   //  server.route({  
   //    method: 'GET',
   //    path: '/node_modules/bootstrap/dist/fonts/{file*}',
   //    handler: {
   //      directory: { 
   //        path: 'node_modules/bootstrap/dist/fonts'
   //      }
   //    }
   //  })

   //  server.route({  
   //    method: 'GET',
   //    path: '/node_modules/angular/{file*}',
   //    handler: {
   //      directory: { 
   //        path: 'node_modules/angular'
   //      }
   //    }
   //  })
   //  server.route({
   //      method: 'GET',
   //      path: '/',
   //      handler: function (request, reply) {
   //          reply.file('app/index.html');           
   //      }
   //  });

   //  server.route({
   //      method: 'GET',
   //      path: '/clinic1',
   //      handler: function (request, reply) {
   //          reply.file('app/clinic1.html');           
   //      }
   //  });

   //   server.route({
   //      method: 'GET',
   //      path: '/clinic2',
   //      handler: function (request, reply) {
   //          reply.file('app/clinic2.html');           
   //      }
   //  });

