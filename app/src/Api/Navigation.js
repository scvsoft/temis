import { Navigation } from 'react-native-navigation'
import I18n from 'app/Locales'
import { images, colors } from 'app/Theme'

const navStyle = {
  navBarBackgroundColor: colors.main,
  navBarTextColor: colors.title,
  statusBarTextColorScheme: 'light'
}

const tabNames = ['help', 'reports', 'insights', 'alerts', 'settings']

const tabsStyle = {
  tabBarButtonColor: colors.disabled,
  tabBarSelectedButtonColor: colors.accent,
  tabBarBackgroundColor: colors.main,
  forceTitlesDisplay: true
}

const tabs = tabNames.map(tabName => ({
  label: I18n.t(`screens.${tabName}.title`),
  screen: `temis.${tabName}`,
  icon: images[`tabs.${tabName}`],
  title: I18n.t(`screens.${tabName}.title`)
}))

export const goHome = () => {
  Navigation.startTabBasedApp({
    tabs,
    tabsStyle,
    appStyle: {
      ...tabsStyle,
      ...navStyle
    }
  })
}

export const triggerSignIn = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'temis.signIn'
    }
  })
}
