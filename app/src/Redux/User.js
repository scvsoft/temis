import { login } from 'app/Api/Facebook'
import { goHome } from 'app/Api/Navigation'
import { createReducer, createActions } from 'reduxsauce'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'

const INITIAL_STATE = {
  token: null
}

const { Types, Creators } = createActions({
  startLogin: null,
  userLogged: ['token'],
  loginFailed: ['error'],
  logout: null
})

export const userLogged = (state, { token }) => ({ ...state, token })

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
    .flatMap(() => login())
    .do(() => {
      goHome()
    })
    .map(({ token }) => Creators.userLogged(token))
    .catch(error => Observable.of(Creators.loginFailed(error)))
