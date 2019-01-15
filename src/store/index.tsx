import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import todoReducer, { sagas as todoSagas } from '../ducks/todos'
import { createLogger } from 'redux-logger'


const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleware()

function* rootSaga() {
  yield all(todoSagas)
}

const store = createStore(
  todoReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware, loggerMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store
