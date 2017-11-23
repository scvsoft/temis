import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import getUsersModel from '../models/user'
import getMongoose from '../models/mongoose'

export default () => {
  const { getUser, getUserByFacebookId, putUser } = getUsersModel(getMongoose())

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

  const createToken = auth =>
    jwt.sign(
      {
        id: auth.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION
      }
    )

  const authenticateWithFacebook = async (req, res) => {
    if (!req.user) {
      res.status(401).send('User Not Authenticated')
    } else {
      // store user
      let currentUser = await getUserByFacebookId(req.user.facebookProvider.id)
      //console.log(`Current user ${req.user.facebookProvider.id}`)
      //console.log(currentUser)
      let isNew = false
      if (!currentUser) {
        isNew = true
        currentUser = await putUser(req.user)
      }

      // prepare token for API
      req.auth = {
        id: currentUser._id
      }

      res.setHeader('x-auth-token', createToken(req.auth))
      res.status(isNew ? 201 : 200).json(currentUser)
    }
  }

  const fetchCurrentUser = async (req, res, next) => {
    const user = await getUser(req.auth.id)
    if (user) {
      req.user = user
      next()
    } else {
      next('unknown user')
    }
  }

  const authenticateRequest = expressJwt({
    secret: process.env.JWT_SECRET,
    requestProperty: 'auth',
    getToken: req => {
      if (req.headers['x-auth-token']) {
        return req.headers['x-auth-token']
      }
      return null
    }
  })

  return {
    errorHandler,
    createToken,
    authenticateWithFacebook,
    fetchCurrentUser,
    authenticateRequest
  }
}
