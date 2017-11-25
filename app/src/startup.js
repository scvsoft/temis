import 'app/Config/ReactotronConfig'
import { triggerSignIn } from 'app/Api/Navigation'
import registerScreens from 'app/Screens'
import createStore from 'app/Redux'
import { Provider } from 'react-redux'
import Config from 'app/Config/Settings'

const { store, persistor } = createStore()
registerScreens(store, Provider)

if (Config.resetStoresOnStartup) {
  persistor.purge()
  store.dispatch({
    type: 'RESET'
  })
}

triggerSignIn()
