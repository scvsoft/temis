import { FBLoginManager } from 'react-native-facebook-login'
import { goHome } from 'app/Api/Navigation'

export const login = () => {
  FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web) // defaults to Native

  FBLoginManager.loginWithPermissions(['email'], (error, data) => {
    if (!error && data && data.credentials) {
      // all good, we can proceed
      // console.tron.log(data)
      goHome()
    } else if (
      error === 'Cancel' ||
      (typeof error === 'object' && error.type === 'cancel')
    ) {
      // cancelled by the user, we likely do nothing and go back to the login screen
      // console.tron.log('Cancel!', error)
    } else {
      // in this case there was another sort of error, we may want to show a message
      // console.tron.log('UPS!!!', error, data)
    }
  })
}
