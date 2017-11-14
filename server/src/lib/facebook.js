import passport from 'passport'
import FacebookTokenStrategy from 'passport-facebook-token'
import Users from '../models/user'

export default () => {
  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENTID,
        clientSecret: process.env.FACEBOOK_CLIENTSECRET,
        profileFields: ['id', 'displayName', 'gender', 'email', 'birthday']
      },
      (accessToken, refreshToken, profile, done) => {
        // save user in memory
        const user = {
          fullName: profile._json.name,
          email: profile._json.email,
          facebookProvider: {
            id: profile._json.id,
            token: accessToken
          }
        }
        Users.put(profile.id, user)
        done(null, user)
      }
    )
  )
}
