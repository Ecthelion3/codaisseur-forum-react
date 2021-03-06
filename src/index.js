import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import ReduxThunk from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as reducers from './reducers'

const reducer = combineReducers(
  Object.assign({}, reducers, {
    routing: routerReducer,
  }
))
const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f
const enhancer = compose(
  applyMiddleware(ReduxThunk),
  devTools,
)
// Note: passing enhancer as the last argument requires redux@>=3.1.0
const store = createStore(reducer, enhancer)
const history = syncHistoryWithStore(browserHistory, store)

function requireAuth(nextState, replace) {
  if (!false) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

import App from './App'
import QuestionsWrapper from './containers/QuestionsWrapper'
import Questions from './containers/Questions'
import Question from './containers/Question'
import NewQuestion from './containers/NewQuestion'
import EditQuestion from './containers/EditQuestion'

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path="" component={App}>
            <Route path="" component={QuestionsWrapper}>
            <Route path="/" component={Questions}/>
            <Route path="question/new" component={NewQuestion}/>
            <Route path="question/:questionId/edit" component={EditQuestion}/>
            <Route path="question/:questionId" component={Question}/>
          </Route>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
