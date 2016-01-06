import Hapi from 'hapi';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, RoutingContext, match } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { renderToString } from 'react-dom/server';


import routes  from './routes';
import * as reducers from './shared/reducers';


const server = new Hapi.Server();


server.connection({
    port: 8000,
    labels: 'web'
});

// server.connection({
//     port: 4000,
//     labels: 'api'
// });


server.start((err) => {

    if (err) {
        throw err;
    }

    server.select('web').ext('onRequest', (request, reply) => {

        console.log('onRequest');

        const reducer = combineReducers(reducers);
        const store = createStore(reducer);

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

                const InitialComponent = (
                    <Provider store={ store }>
                        <RoutingContext { ...renderProps } />
                    </Provider>
                );

                const initialState = store.getState();

                const HTML =
`<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Isomorphic Redux Demo</title>
    </head>
    <body>
        <div id="react-view">${renderToString(InitialComponent)}</div>
        <script type="application/javascript">
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script type="application/javascript" src="http://localhost:8080/bundle.js"></script>
    </body>
</html>`;
                return reply(HTML);
            }
        });
    });


    // server.select('api').ext('onRequest', (request, reply) => {

    //     console.log('onApiRequest');
    //     // console.log(request);
    //     return reply.continue();
    // });

    console.log('Servers running at ');
    server.connections.forEach((serv) => {

        console.log(serv.info.uri);
    });
});
