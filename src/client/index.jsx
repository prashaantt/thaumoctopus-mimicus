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


let initialState = window.__INITIAL_STATE__;


Object.keys(initialState).forEach((key) => {
    initialState[key] = fromJS(initialState[key]);
});


const reducer = combineReducers(reducers);
const store = createStore(reducer);


render(
    <Provider store={ store }>
        <Router routes={ routes } history={ history } />
    </Provider>,
    document.getElementById('react-view')
);
