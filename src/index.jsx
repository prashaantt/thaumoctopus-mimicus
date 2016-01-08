import Hapi from 'hapi';
import Inert from 'inert';
import React from 'react';
import Thunk from 'redux-thunk';
import { MongoClient } from 'mongodb';
import { Provider } from 'react-redux';
import { Router, RoutingContext, match } from 'react-router';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { renderToString } from 'react-dom/server';


import routes  from './routes';
import { fetchCounter } from './shared/actions/CounterActions';
import * as reducers from './shared/reducers';


const server = new Hapi.Server();


server.connection({
    port: 8000,
    labels: 'web'
});


server.select('web').register(Inert, () => {});


server.connection({
    port: 4000,
    labels: 'api'
});


const url = 'mongodb://localhost:27017/thaumoctopus';


let connection;


server.ext('onPreStart', (serv, next) => {

    MongoClient.connect(url).then((db) => {

        connection = db;
        next();
    }).then((err) => {

        if (err) {
            console.error(err);
            return;
        }
    });
});


server.ext('onPostStop', (serv, next) => {

    connection.close();
    next();
});


server.select('api').route({
    method: 'GET',
    path: '/api/counter/increment',
    config: {
        cors: true
    },
    handler: function (request, reply) {

        const updatedDoc = connection.collection('counter').update({}, { $inc: { counter: 1 } });
        return reply(updatedDoc);
    }
});

server.select('api').route({
    method: 'GET',
    path: '/api/counter/decrement',
    config: {
        cors: true
    },
    handler: function (request, reply) {

        const updatedDoc = connection.collection('counter').update({}, { $inc: { counter: -1 } });
        return reply(updatedDoc);
    }
});


server.select('api').route({
    method: 'GET',
    path: '/api/counter',
    config: {
        cors: true
    },
    handler: function (request, reply) {

        try {
            connection.collection('counter').findOne((err, counter) => {

                if (err) {
                    console.error(err);
                    return reply(err);
                }
                return reply(counter);
            });
        }
        catch (e) {
            console.error(e);
        }
    }
});


server.start((err) => {

    if (err) {
        throw err;
    }

    server.select('web').ext('onRequest', function (request, reply) {

        if (request.url.pathname === '/bundle.js') {

            return reply.file('./dist/bundle.js');
        }

        const reducer = combineReducers(reducers);
        const createStoreWithMiddleware = applyMiddleware(Thunk)(createStore);
        const store = createStoreWithMiddleware(reducer);

        match({ routes, location: request.url }, (error, redirectLocation, renderProps) => {

            if (error) {
                console.error(error);
                reply(error);
            }
            else if (redirectLocation) {
                reply.redirect(redirectLocation.pathname + redirectLocation.search);
            }
            else if (!renderProps) {
                reply('The page was not found').code(404);
            }
            else {
                const render = () => {

                    const InitialComponent = (
                        <Provider store={ store }>
                            <RoutingContext { ...renderProps } />
                        </Provider>
                    );

                    const initialState = store.getState();

                    return (
`<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Isomorphic Redux Demo</title>
    </head>
    <body>
        <div id="react-view">${ renderToString(InitialComponent) }</div>
        <script type="application/javascript">
            window.__INITIAL_STATE__ = ${ JSON.stringify(initialState) };
        </script>
        <script type="application/javascript" src="bundle.js"></script>
    </body>
</html>`
                    );
                };

                store.dispatch(fetchCounter()).then(() => reply(render()));
            }
        });
    });

    console.log('Servers running at');
    server.connections.forEach((serv) => {

        console.log(serv.info.uri);
    });
});
