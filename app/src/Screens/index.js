import { Navigation } from 'react-native-navigation'

import Help from './Help'
import ComingSoon from './ComingSoon'

export default (store, Provider) => {
  Navigation.registerComponent('temis.help', () => Help)
  Navigation.registerComponent('temis.reports', () => ComingSoon)
  Navigation.registerComponent('temis.insights', () => ComingSoon)
  Navigation.registerComponent('temis.alerts', () => ComingSoon)
  Navigation.registerComponent('temis.settings', () => ComingSoon)
}
