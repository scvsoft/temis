import dotenv from 'dotenv'
import createApp from './app'

dotenv.config()

const app = createApp()

app.listen(process.env.PORT || 3000, process.env.HOST || 'localhost')
