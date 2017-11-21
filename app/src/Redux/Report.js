import { createReducer, createActions } from 'reduxsauce'

const INITIAL_STATE = {
  count: 0
}

const { Types, Creators } = createActions({
  report: null
})

export const report = state => ({ ...state, count: state.count + 1 })

export default Creators

export const ReportTypes = Types

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REPORT]: report
})
