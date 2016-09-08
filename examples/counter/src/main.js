/*eslint-disable no-unused-vars*/
import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createCoonMiddleware } from 'redux-saga-coon'
import Counter from './components/Counter'
import reducer from './reducers'
import rootSaga from './sagas'

const coonMiddleware = createCoonMiddleware({ channelName: 'counter-example' })
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, coonMiddleware)
)
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementIfOdd={() => action('INCREMENT_IF_ODD')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
