import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import Users from './models/user'
import authenticationRoutes, {
  authenticate,
  getCurrentUser
} from './lib/authentication'

export default () => {
  const app = express()

  app.use(helmet())

  app.use(bodyParser.json())

  app.use('/authentication', authenticationRoutes())

  app.use(authenticate())
  app.use(getCurrentUser)

  app.get('/users/:userId', (req, res) => {
    if (req.params.userId !== req.user.id) {
      res.status(401)
    } else {
      res.status(200).json(req.user)
    }
  })

  app.put('/users/:userId', (req, res) => {
    if (req.params.userId !== req.user.id) {
      res.status(401)
    } else {
      const user = {
        id: req.user.id,
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        birthday: req.body.birthday
      }
      Users.put(req.user.id, user)
      res.status(200).json(user)
    }
  })

  return app
}
