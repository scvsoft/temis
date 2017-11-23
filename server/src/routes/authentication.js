import express from 'express'
import passport from 'passport'
import passportConfig from '../lib/facebook'
import authenticationControllerBuilder from '../controllers/authentication'

export default () => {
  const router = express.Router()
  // setup configuration for facebook login
  passportConfig()

  const { authenticateWithFacebook } = authenticationControllerBuilder()

  router.use(passport.authenticate('facebook-token', { session: false }))
  router.post('/facebook', authenticateWithFacebook)

  return router
}
