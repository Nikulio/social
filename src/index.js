import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";

import "reset.css/reset.css";

import App from './smart/App';
import reducers from "./reducers";
import history from "./history";


const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducers, reduxDevTools, applyMiddleware())


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
