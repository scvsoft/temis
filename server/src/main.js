import dotenv from 'dotenv'
import createApp from './app'

dotenv.config()

// this allows for dependency injection of the config object for testing
const app = createApp()

app.listen(process.env.PORT || 3000, process.env.HOST || 'localhost')
