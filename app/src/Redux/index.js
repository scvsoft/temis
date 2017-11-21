import Config from 'app/Config/DebugSettings'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as report } from './Report'

const middleware = []

const rootReducer = combineReducers({
  report
})

const actualCreateStore = Config.useReactotron
  ? console.tron.createStore
  : createStore

export default () =>
  actualCreateStore(rootReducer, applyMiddleware(...middleware))
