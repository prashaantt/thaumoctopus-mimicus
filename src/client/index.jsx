import 'babel-polyfill';
import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { fromJS } from 'immutable';
import { render } from 'react-dom';


import routes from '../routes';
import * as reducers from '../shared/reducers';


const history = createBrowserHistory();


const reducer = combineReducers(reducers);
const initialState = window.__INITIAL_STATE__;
const store = createStore(reducer, initialState);

// store.subscribe(() => {

//     console.log(store.getState());
// });

render(
    <Provider store={ store }>
        <Router routes={ routes } history={ history } />
    </Provider>,
    document.getElementById('react-view')
);
