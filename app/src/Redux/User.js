import { login as facebookLogin } from 'app/Api/Facebook'
import { loginUser } from 'app/Api/Backend'
import { goHome } from 'app/Api/Navigation'
import { createReducer, createActions } from 'reduxsauce'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'

const INITIAL_STATE = {}

const { Types, Creators } = createActions({
  startLogin: null,
  userLogged: ['user'],
  loginFailed: ['error'],
  logout: null
})

export const userLogged = (state, { user }) => user

export const logout = state => INITIAL_STATE

export default Creators

export const UserTypes = Types

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_LOGGED]: userLogged,
  [Types.LOGOUT]: logout
})

export const epic = (action$, store) =>
  action$
    .ofType(Types.START_LOGIN)
    .flatMap(() => facebookLogin())
    .flatMap(({ token }) => loginUser(token))
    .do(() => {
      goHome()
    })
    .map(user => Creators.userLogged(user))
    .catch(error => Observable.of(Creators.loginFailed(error)))
