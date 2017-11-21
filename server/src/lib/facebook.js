import passport from 'passport'
import FacebookTokenStrategy from 'passport-facebook-token'

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
          name: profile._json.name,
          email: profile._json.email,
          gender: profile._json.gender,
          birthday: profile._json.birthday,
          facebookProvider: {
            id: profile._json.id,
            token: accessToken
          }
        }
        done(null, user)
      }
    )
  )
}
