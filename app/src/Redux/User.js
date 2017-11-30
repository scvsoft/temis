import { login as facebookLogin } from 'app/Api/Facebook'
import { loginUser, updateUser } from 'app/Api/Backend'
import { goHome } from 'app/Api/Navigation'
import { createReducer, createActions } from 'reduxsauce'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'

// INITIAL STATE
const INITIAL_STATE = {
  authenticating: false,
  data: {},
  auth: null
}

// ACTION TYPES AND CREATORS
const { Types, Creators } = createActions({
  startLogin: null,
  userLogged: ['data', 'auth', 'firstTime'],
  loginFailed: ['error'],
  logout: null,
  update: ['newData'],
  userUpdated: null,
  updateFailed: null
})

// REDUCERS
export const userLogged = (state, { data, auth }) => ({
  data,
  auth,
  authenticating: false
})

export const startLogin = state => ({ authenticating: true })

export const loginFailed = state => ({ authenticating: false })

export const logout = state => INITIAL_STATE

export const update = (state, { newData }) => ({
  ...state,
  data: { ...state.data, newData }
})

export default Creators

export const UserTypes = Types

// MAP REDUCERS TO ACTIONS
export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_LOGGED]: userLogged,
  [Types.START_LOGIN]: startLogin,
  [Types.LOGIN_FAILED]: loginFailed,
  [Types.UPDATE]: update,
  [Types.LOGOUT]: logout
})

// EPICS
const loginEpic = (action$, store) =>
  action$.ofType(Types.START_LOGIN).flatMap(() =>
    Observable.fromPromise(facebookLogin())
      .flatMap(({ token }) => loginUser(token))
      .map(({ user, auth, firstTime }) =>
        Creators.userLogged(user, auth, firstTime)
      )
      .do(({ firstTime }) => {
        goHome(firstTime)
      })
      .catch(error => Observable.of(Creators.loginFailed(error)))
  )

const updateEpic = (action$, store) =>
  action$
    .ofType(Types.UPDATE)
    .flatMap(({ newData }) => updateUser(withAuth(store)(newData)))
    .map(({ ok }) => (ok ? Creators.userUpdated() : Creators.updateFailed()))

export const epic = (action$, store) =>
  Observable.merge(loginEpic(action$, store), updateEpic(action$, store))

// EVERYTHING ELSE (selectors, model data, utilities)
export const GenderEnum = ['male', 'female', 'other', 'unspecified']

export const withAuth = store => data => ({
  ...data,
  _auth: store.getState().user.auth
})
