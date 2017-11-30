import { login as facebookLogin } from 'app/Api/Facebook'
import { loginUser } from 'app/Api/Backend'
import { goHome } from 'app/Api/Navigation'
import { createReducer, createActions } from 'reduxsauce'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'

const INITIAL_STATE = {
  authenticating: false
}

const { Types, Creators } = createActions({
  startLogin: null,
  userLogged: ['user', 'firstTime'],
  loginFailed: ['error'],
  logout: null
})

export const userLogged = (state, { user }) => ({
  ...user,
  authenticating: false
})

export const startLogin = state => ({ authenticating: true })

export const loginFailed = state => ({ authenticating: false })

export const logout = state => INITIAL_STATE

export default Creators

export const UserTypes = Types

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_LOGGED]: userLogged,
  [Types.START_LOGIN]: startLogin,
  [Types.LOGIN_FAILED]: loginFailed,
  [Types.LOGOUT]: logout
})

export const epic = (action$, store) =>
  action$.ofType(Types.START_LOGIN).flatMap(() =>
    Observable.fromPromise(facebookLogin())
      .flatMap(({ token }) => loginUser(token))
      .map(({ user, firstTime }) => Creators.userLogged(user, firstTime))
      .do(({ firstTime }) => {
        goHome(firstTime)
      })
      .catch(error => Observable.of(Creators.loginFailed(error)))
  )

export const GenderEnum = ['male', 'female', 'other', 'unspecified']
