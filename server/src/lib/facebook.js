import passport from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';
import Users from '../models/user';
import getConfig from '../config';

const config = getConfig(process.env.NODE_ENV);

export default () => {
  passport.use(new FacebookTokenStrategy(
    {
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // save user in memory
      console.log(profile);
      // profile.id
      // profile.displayName
      // profile.emails[0].value
      const user = {
        fullName: profile.displayName,
        email: profile.emails[0].value,
        id: profile.id,
        facebookProvider: {
          id: profile.id,
          token: accessToken,
        },
      };
      Users.put(profile.id, user);
      done(null, user);
    },
  ));
};
