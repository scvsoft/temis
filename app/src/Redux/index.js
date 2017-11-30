import Config from 'app/Config/Settings'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import storage from 'redux-persist/es/storage'
import reduxReset from 'redux-reset'
import { epic as reportEpic } from './Report'
import { reducer as user, epic as userEpic } from './User'

const config = {
  key: 'root',
  storage
}

const middleware = []

const rootReducer = persistCombineReducers(config, {
  user
})

const rootEpic = combineEpics(userEpic, reportEpic)

middleware.push(createEpicMiddleware(rootEpic))

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
