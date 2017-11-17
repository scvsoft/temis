import { Navigation } from 'react-native-navigation'

import SignIn from './SignIn'
import Help from './Help'
import ComingSoon from './ComingSoon'

export default (store, Provider) => {
  const registerScreen = (name, component = ComingSoon) => {
    Navigation.registerComponent(name, () => component, store, Provider)
  }
  registerScreen('temis.signIn', SignIn)
  registerScreen('temis.help', Help)
  registerScreen('temis.reports')
  registerScreen('temis.insights')
  registerScreen('temis.alerts')
  registerScreen('temis.settings')
}
