import 'app/Config/ReactotronConfig'
import { triggerSignIn } from 'app/Api/Navigation'
import registerScreens from 'app/Screens'
import createStore from 'app/Redux'
import { Provider } from 'react-redux'

const { store } = createStore()
registerScreens(store, Provider)

triggerSignIn()
