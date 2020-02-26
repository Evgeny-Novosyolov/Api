import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import reducer from '../reducers'



export const history = createBrowserHistory()
const middleware = routerMiddleware(history)
const initialState = {}
const store = createStore(
    connectRouter(history)(reducer),
    initialState,
    composeWithDevTools
    (applyMiddleware(middleware,thunk)),
);

export default store;
