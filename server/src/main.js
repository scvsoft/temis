import './bootstrap'
import app from './app'

app.listen(process.env.PORT || 3000, process.env.HOST || 'localhost')
