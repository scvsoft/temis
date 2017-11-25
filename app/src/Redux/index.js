import Config from 'app/Config/Settings'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import storage from 'redux-persist/es/storage'
import reduxReset from 'redux-reset'
import { reducer as report } from './Report'
import { reducer as user, epic as userEpic } from './User'

const config = {
  key: 'root',
  storage
}

const middleware = []

const rootReducer = persistCombineReducers(config, {
  user,
  report
})

const rootEpic = combineEpics(userEpic)

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
