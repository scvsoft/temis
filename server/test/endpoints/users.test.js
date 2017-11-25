import nock from 'nock'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import chaid from 'chaid'
import http from 'http'
import dotenv from 'dotenv'
import createApp from '../../src/app'
import authenticationControllerBuilder from '../../src/controllers/authentication'
import getUsersModel from '../../src/models/user'
import getMongoose from '../../src/models/mongoose'

chai.use(chaiHttp)
chai.use(chaid)

describe('Server', () => {
  let mongoose
  let userModel
  let server
  let createToken

  beforeAll(() => {
    dotenv.config()
    // specific test settings
    process.env.MONGODB_DBNAME = 'temis-test'

    mongoose = getMongoose()
    userModel = getUsersModel(mongoose)

    const app = createApp()
    server = http.createServer(app)
    createToken = authenticationControllerBuilder().createToken
  })

  beforeEach(() => {
    mongoose.connection.dropDatabase()
    process.env.JWT_EXPIRATION = '2h'

    nock('https://graph.facebook.com:443', { encodedQueryParams: true })
      .get(/\/me$/)
      .query(queryObj => queryObj.access_token === 'valid_token')
      .reply(200, {
        id: '106458953461566',
        name: 'Margaret Wongberg',
        email: 'margaret_zldursm_wongberg@tfbnw.net',
        gender: 'female'
      })

    nock('https://graph.facebook.com:443', { encodedQueryParams: true })
      .get(/\/me$/)
      .query(queryObj => queryObj.access_token === 'invalid_token')
      .reply(400, {
        error: {
          message: 'Invalid OAuth access token.',
          type: 'OAuthException',
          code: 190,
          fbtrace_id: 'FdNcpt5NRHD'
        }
      })
  })

  describe('Sign up', () => {
    test('should return an error when token is invalid', done => {
      chai
        .request(server)
        .post('/authentication/facebook')
        .send({ access_token: 'invalid_token' })
        .end((err, res) => {
          expect(res).to.have.status(401)
          done()
        })
    })

    test('returns 201, the JWT token and the profile when the user is new', done => {
      chai
        .request(server)
        .post('/authentication/facebook')
        .send({ access_token: 'valid_token' })
        .end((err, res) => {
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('name', 'Margaret Wongberg')
          expect(res).to.have.header('x-auth-token')
          done()
        })
    })
  })

  describe('Sign in', () => {
    test('returns 200, the JWT token and the profile when the user is already registered', async done => {
      await userModel.putUser({
        name: 'Rod',
        email: 'xxx@gmail.com',
        birthday: '11/23/2017',
        gender: 'male',
        facebookProvider: {
          id: '106458953461566',
          token: 'token'
        }
      })

      chai
        .request(server)
        .post('/authentication/facebook')
        .send({ access_token: 'valid_token' })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('email', 'xxx@gmail.com')
          expect(res).to.have.header('x-auth-token')
          done()
        })
    })
  })

  describe('Get User profile', () => {
    test('returns the profile if JWT token is present and valid', async done => {
      const newUser = await userModel.putUser({
        name: 'Rod',
        email: 'xxx@gmail.com',
        birthday: '11/23/2017',
        gender: 'male',
        facebookProvider: {
          id: '106458953461566',
          token: 'token'
        }
      })
      const token = createToken({ id: newUser._id })

      chai
        .request(server)
        .get(`/users/${newUser._id}`)
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body)
            .to.have.property('_id')
            .to.be.id(mongoose.Types.ObjectId(newUser._id))
          expect(res.body).to.have.property('email', 'xxx@gmail.com')
          done()
        })
    })

    test('returns an authentication response error if JWT token is not present', done => {
      chai
        .request(server)
        .get('/users/106458953461566')
        .end((err, res) => {
          expect(res).to.have.status(401)
          done()
        })
    })

    test('returns an authentication response error if JWT token is expired', done => {
      process.env.JWT_EXPIRATION = 0 // in seconds
      const token = createToken({ id: 1001 })

      chai
        .request(server)
        .get('/users/106458953461566')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res).to.have.status(401)
          done()
        })
    })

    test('returns an error if user doesnt match token (💣)', async done => {
      const newUser = await userModel.putUser({
        name: 'Rod',
        email: 'xxx@gmail.com',
        birthday: '11/23/2017',
        gender: 'male',
        facebookProvider: {
          id: '106458953461566',
          token: 'token'
        }
      })
      const token = createToken({ id: newUser._id })

      chai
        .request(server)
        .get('/users/1')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res).to.have.status(401)
          done()
        })
    })
  })

  describe('Put User profile', () => {
    test('sets the user profile if JWT token is present and valid', async done => {
      const userProperties = {
        name: 'Rod',
        email: 'xxx@gmail.com',
        birthday: '11/23/2017',
        gender: 'male',
        facebookProvider: {
          id: '106458953461566',
          token: 'token'
        }
      }
      const newUser = await userModel.putUser(userProperties)
      const token = createToken({ id: newUser._id })

      chai
        .request(server)
        .put(`/users/${newUser._id}`)
        .send({ ...userProperties, name: 'Olivia' })
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('name', 'Olivia')
          done()
        })
    })

    test('returns an authentication response error if JWT token is not present', done => {
      chai
        .request(server)
        .get('/users/106458953461566')
        .end((err, res) => {
          expect(res).to.have.status(401)
          done()
        })
    })

    test('returns an authentication response error if JWT token is expired', done => {
      process.env.JWT_EXPIRATION = 0 // in seconds
      const token = createToken({ id: 1001 })

      chai
        .request(server)
        .get('/users/106458953461566')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res).to.have.status(401)
          done()
        })
    })

    test('returns an error if user doesnt match token', async done => {
      const userProperties = {
        name: 'Rod',
        email: 'xxx@gmail.com',
        birthday: '11/23/2017',
        gender: 'male',
        facebookProvider: {
          id: '106458953461566',
          token: 'token'
        }
      }
      const newUser = await userModel.putUser(userProperties)
      const token = createToken({ id: newUser._id })

      chai
        .request(server)
        .put('/users/1')
        .send({ ...userProperties, id: 1, name: 'Fake name' })
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res).to.have.status(401)
          done()
        })
    })
  })

  afterAll(done => {
    mongoose.connection.close(done)
    server.close(done)
  })
})
