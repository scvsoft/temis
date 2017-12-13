import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import {
  getUser,
  getUserByFacebookId,
  putUser,
  normalizeGender
} from '../models/user'

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

export const authenticateWithFacebook = async (req, res) => {
  if (!req.user) {
    res.status(401).send('User Not Authenticated')
  } else {
    // store user
    let currentUser = await getUserByFacebookId(req.user.facebookProvider.id)

    let isNew = false
    if (!currentUser) {
      isNew = true
      const gender = normalizeGender(req.user.gender)
      currentUser = await putUser({ ...req.user, gender })
    }

    // prepare token for API
    req.auth = {
      id: currentUser._id
    }

    res.setHeader('x-auth-token', createToken(req.auth))
    res.status(isNew ? 201 : 200).json(currentUser)
  }
}

export const fetchCurrentUser = async (req, res, next) => {
  const user = await getUser(req.auth.id)
  if (user) {
    req.user = user
    next()
  } else {
    next('unknown user')
  }
}

export const authenticateRequest = expressJwt({
  secret: process.env.JWT_SECRET,
  requestProperty: 'auth',
  getToken: req => {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token']
    }
    return null
  }
})
