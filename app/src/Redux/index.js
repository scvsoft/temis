import { createStore, combineReducers } from 'redux'
import { reducer as report } from './Report'

const rootReducer = combineReducers({
  report
})

export default () => createStore(rootReducer)
