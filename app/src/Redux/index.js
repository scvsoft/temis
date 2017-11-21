import Config from 'app/Config/DebugSettings'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { reducer as report } from './Report'

const config = {
  key: 'root',
  storage
}

const middleware = []

const rootReducer = persistCombineReducers(config, {
  report
})

const actualCreateStore = Config.useReactotron
  ? console.tron.createStore
  : createStore

export default () => {
  const store = actualCreateStore(rootReducer, applyMiddleware(...middleware))
  const persistor = persistStore(store)
  return { store, persistor }
}
