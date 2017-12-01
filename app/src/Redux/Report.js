import { createActions } from 'reduxsauce'
import { withAuth } from './User'
import { sendReport } from 'app/Api/Backend'

const INITIAL_STATE = {}

const { Types, Creators } = createActions({
  report: ['reportData'],
  reportSaved: null,
  reportFailed: null
})

export default Creators

export const ReportTypes = Types

export const epic = (action$, store) =>
  action$
    .ofType(Types.REPORT)
    .flatMap(({ reportData }) => sendReport(withAuth(store)(reportData)))
    .map(({ ok }) => (ok ? Creators.reportSaved() : Creators.reportFailed()))
