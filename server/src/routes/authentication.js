import express from 'express'
import passport from 'passport'
import passportConfig from '../lib/facebook'
import {
  errorHandler,
  authenticateWithFacebook
} from '../controllers/authentication'

export default () => {
  const router = express.Router()
  // setup configuration for facebook login
  passportConfig()

  router.use(passport.authenticate('facebook-token', { session: false }))
  router.post('/facebook', authenticateWithFacebook)
  router.use(errorHandler)

  return router
}
