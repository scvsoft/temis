import { FBLoginManager } from 'react-native-facebook-login'

export const login = () => {
  debugger
  FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web) // defaults to Native

  FBLoginManager.loginWithPermissions(['email'], (error, data) => {
    if (!error && data && data.credentials) {
      // Acá está todo bien, deberías tener en data algo como { credentials: { userId, token } }
      console.log(data)
    } else if (
      error === 'Cancel' ||
      (typeof error === 'object' && error.type === 'cancel')
    ) {
      // esto es estaría bien, no hace falta hacer nada
      console.log('Cancel!', error)
    } else {
      // acá falló, así que por ahí queres pedir disculpas al usuario
      console.log('UPS!!!', error, data)
    }
  })
}
