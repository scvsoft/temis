import Config from 'app/Config/DebugSettings'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import reduxReset from 'redux-reset'
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
  const store = actualCreateStore(
    rootReducer,
    compose(applyMiddleware(...middleware), reduxReset())
  )
  const persistor = persistStore(store)
  return { store, persistor }
}
