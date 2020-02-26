import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/app';


import store, {history} from './store';


ReactDOM.render(
         <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>,
    document.getElementById('root')
);


