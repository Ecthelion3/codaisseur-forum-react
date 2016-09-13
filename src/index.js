import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import * as reducers from './reducers'
const reducer = combineReducers(reducers)
const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f
const enhancer = compose(devTools)

// Note: passing enhancer as the last argument requires redux@>=3.1.0
const store = createStore(reducer, enhancer)

import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
)
