import express from 'express'
import passport from 'passport'
import passportConfig from '../lib/facebook'
import { authenticateWithFacebook } from '../controllers/authentication'

const router = express.Router()
// setup configuration for facebook login
passportConfig()

router.use(passport.authenticate('facebook-token', { session: false }))
router.post('/facebook', authenticateWithFacebook)

export default router
