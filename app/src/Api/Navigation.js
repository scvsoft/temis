import { Navigation } from 'react-native-navigation'
import I18n from 'app/Locales'
import { images, colors } from 'app/Theme'

const navStyle = {
  navBarBackgroundColor: colors.main,
  navBarTextColor: colors.title,
  statusBarTextColorScheme: 'light',
  navigationBarColor: colors.mainDarker,
  statusBarColor: colors.mainDarker,
  navBarButtonColor: colors.title
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

export const goHome = firstTime => {
  Navigation.startTabBasedApp({
    tabs,
    tabsStyle,
    appStyle: {
      ...tabsStyle,
      ...navStyle
    }
  })

  // this is quite a nasty hack, because unfortunately startTabBasedApp
  // does not offer a callback, and on Android it seems that pushing a modal
  // immediately is "too soon" and then it doesn't show
  setTimeout(() => {
    if (firstTime) {
      Navigation.showModal({
        screen: 'temis.profile',
        title: I18n.t('screens.profile.title')
      })
    }
  }, 1)
}

export const triggerSignIn = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'temis.signIn'
    },
    appStyle: {
      navBarHidden: true
    }
  })
}
