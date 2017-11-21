import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import authenticationRoutesBuilder from './routes/authentication'
import usersRoutesBuilder from './routes/users'
import {
  authenticateRequestBuilder,
  fetchCurrentUser
} from './controllers/authentication'

export default () => {
  const app = express()

  app.use(helmet())

  app.use(bodyParser.json())

  app.use('/authentication', authenticationRoutesBuilder())

  app.use(authenticateRequestBuilder())
  app.use(fetchCurrentUser)

  app.use('/users', usersRoutesBuilder())

  return app
}
