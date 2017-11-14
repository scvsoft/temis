import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import passport from 'passport'
import express from 'express'
import passportConfig from './facebook'
import Users from '../models/user'

export const createToken = auth =>
  jwt.sign(
    {
      id: auth.id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION
    }
  )

const authenticationResponse = (req, res) => {
  res.setHeader('x-auth-token', req.token)
  res.status(req.new ? 201 : 200).json(req.user)
}

const generateToken = (req, res, next) => {
  req.token = createToken(req.auth)
  next()
}

// token handling middleware
export const authenticate = () =>
  expressJwt({
    secret: process.env.JWT_SECRET,
    requestProperty: 'auth',
    getToken: req => {
      if (req.headers['x-auth-token']) {
        return req.headers['x-auth-token']
      }
      return null
    }
  })

export const getCurrentUser = (req, res, next) => {
  const user = Users.get(req.auth.id)
  delete user.facebookProvider
  if (user) {
    req.user = user
    next()
  } else {
    next('unknown user')
  }
}

const errorHandler = (err, req, res, next) => {
  // console.error("Error: ", err.name, err.message, err.status, err.stack)

  // JWT
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid jwt token...')
  }

  // Facebook
  if (err.name === 'InternalOAuthError') {
    res.status(401).send('invalid facebook token...')
  }

  next()
}

export default () => {
  // setup configuration for facebook login
  passportConfig()
  const router = express.Router()

  router.post(
    '/facebook',
    passport.authenticate('facebook-token', { session: false }),
    (req, res, next) => {
      if (!req.user) {
        res.status(401).send('User Not Authenticated')
      } else {
        // store user
        // replace by id from persistence model when implemented (https://github.com/scvsoft/temis/issues/11)
        req.user.id = req.user.facebookProvider.id
        req.new = Users.get(req.user.id) === undefined
        Users.put(req.user.id, req.user)

        // prepare token for API
        req.auth = {
          id: req.user.id
        }
        next()
      }
    },
    generateToken,
    authenticationResponse
  )

  router.use(errorHandler)

  return router
}
