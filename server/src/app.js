import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import authenticationRoutes from './routes/authentication'
import usersRoutes from './routes/users'
import reportsRoutes from './routes/reports'
import {
  errorHandler,
  authenticateRequest,
  fetchCurrentUser
} from './controllers/authentication'

const app = express()

app.use(helmet())

app.use(bodyParser.json())

app.use('/authentication', authenticationRoutes)

app.use(authenticateRequest)
app.use(fetchCurrentUser)

app.use('/users', usersRoutes)

app.use('/reports', reportsRoutes)

app.use(errorHandler)

export default app
