import { Navigation } from 'react-native-navigation'
import I18n from 'app/Locales'
import { images, colors } from 'app/Theme'
import registerScreens from 'app/Screens'

registerScreens()

const tabNames = ['help', 'reports', 'insights', 'alerts', 'settings']

const tabsStyle = {
  tabBarButtonColor: colors.disabled,
  tabBarSelectedButtonColor: colors.accent,
  tabBarBackgroundColor: colors.main,
  forceTitlesDisplay: true
}

Navigation.startTabBasedApp({
  tabs: tabNames.map(tabName => ({
    label: I18n.t(`screens.${tabName}.title`),
    screen: `temis.${tabName}`,
    icon: images[`tabs.${tabName}`],
    title: I18n.t(`screens.${tabName}.title`)
  })),
  tabsStyle,
  appStyle: tabsStyle
})
