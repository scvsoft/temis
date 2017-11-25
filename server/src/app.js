import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import authenticationRoutesBuilder from './routes/authentication'
import usersRoutesBuilder from './routes/users'
import authenticationControllerBuilder from './controllers/authentication'

export default () => {
  const app = express()

  const {
    errorHandler,
    authenticateRequest,
    fetchCurrentUser
  } = authenticationControllerBuilder()

  app.use(helmet())

  app.use(bodyParser.json())

  app.use('/authentication', authenticationRoutesBuilder())

  app.use(authenticateRequest)
  app.use(fetchCurrentUser)

  app.use('/users', usersRoutesBuilder())

  app.use(errorHandler)

  return app
}
