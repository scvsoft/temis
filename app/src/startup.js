import { triggerSignIn } from 'app/Api/Navigation'
import I18n from 'app/Locales'
import { images, colors } from 'app/Theme'
import registerScreens from 'app/Screens'
import createStore from 'app/Redux'
import { Provider } from 'react-redux'

const store = createStore()
registerScreens(store, Provider)

triggerSignIn()
