import Config from 'app/Config/DebugSettings'
import Reactotron from 'reactotron-react-native'

if (Config.useReactotron) {
  const { reactotronRedux } = require('reactotron-redux')
  Reactotron.configure()
    .useReactNative()
    .use(reactotronRedux())
    .connect()
  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron
} else {
  // a mock version should you decide to leave console.tron in your codebase
  console.tron = {
    log: () => false,
    warn: () => false,
    error: () => false,
    display: () => false,
    image: () => false
  }
}
