import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import passport from 'passport';
import passportConfig from './lib/facebook';
import Users from './models/user';

export const createToken = (auth, config) => jwt.sign(
  {
    id: auth.id,
  }, config.jwt.secret,
  {
    expiresIn: config.jwt.expiration,
  },
);

export const createApp = (config) => {
  const app = express();

  app.use(bodyParser.json());

  // authentication setup

  // setup configuration for facebook login
  passportConfig(config);

  const sendToken = (req, res) => {
    res.setHeader('x-auth-token', req.token);
    res.status(200).send(req.auth);
  };

  const generateToken = (req, res, next) => {
    req.token = createToken(req.auth, config);
    next();
  };

  app.post('/auth/facebook', passport.authenticate('facebook-token', { session: false }), (req, res, next) => {
    if (!req.user) {
      res.status(401).send('User Not Authenticated');
    } else {
      // prepare token for API
      req.auth = {
        id: req.user.id,
      };

      next();
    }
  }, generateToken, sendToken);

  // token handling middleware
  const authenticate = expressJwt({
    secret: config.jwt.secret,
    requestProperty: 'auth',
    getToken: (req) => {
      if (req.headers['x-auth-token']) {
        return req.headers['x-auth-token'];
      }
      return null;
    },
  });

  const getCurrentUser = (req, res, next) => {
    const user = Users.get(req.auth.id);
    if (user) {
      req.user = user;
      next();
    } else {
      next('unknown user');
    }
  };

  const getOne = (req, res) => {
    const { user } = req;

    delete user.facebookProvider;

    res.json(user);
  };

  app.get('/auth/me', authenticate, getCurrentUser, getOne);

  app.get('/reports', authenticate, (req, res) => {
    res.json([]);
  });

  app.put('/reports', authenticate, (req, res) => {
    res.status(201).end();
  });

  return app;
};

