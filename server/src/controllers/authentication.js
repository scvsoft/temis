import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import Users from '../models/user'

export const errorHandler = (err, req, res, next) => {
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

export const authenticateWithFacebook = (req, res) => {
  if (!req.user) {
    res.status(401).send('User Not Authenticated')
  } else {
    // store user
    // replace by id from persistence model when implemented (https://github.com/scvsoft/temis/issues/11)
    req.user.id = req.user.facebookProvider.id
    const isNew = Users.get(req.user.id) === undefined
    Users.put(req.user.id, req.user)

    // prepare token for API
    req.auth = {
      id: req.user.id
    }

    res.setHeader('x-auth-token', createToken(req.auth))
    res.status(isNew ? 201 : 200).json(req.user)
  }
}

export const fetchCurrentUser = (req, res, next) => {
  const user = Users.get(req.auth.id)
  delete user.facebookProvider
  if (user) {
    req.user = user
    next()
  } else {
    next('unknown user')
  }
}

export const authenticateRequestBuilder = () =>
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
