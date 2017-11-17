import nock from 'nock'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import http from 'http'
import dotenv from 'dotenv'
import createApp from '../src/app'
import { createToken } from '../src/lib/authentication'
import Users from '../src/models/user'

dotenv.config()

const app = createApp()
const server = http.createServer(app)
// nock.recorder.rec();
chai.use(chaiHttp)

describe('Server', () => {
  beforeEach(() => {
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

    Users.clear()

    process.env.JWT_EXPIRATION = '2h'
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
          expect(res.body).to.have.property('id', '106458953461566')
          expect(res).to.have.header('x-auth-token')
          done()
        })
    })
  })

  describe('Sign in', () => {
    test('returns 200, the JWT token and the profile when the user is already registered', done => {
      Users.put(106458953461566, {
        id: '106458953461566',
        name: 'Name',
        email: 'Email',
        gender: 'Gender',
        birthday: 'Birthday'
      })

      chai
        .request(server)
        .post('/authentication/facebook')
        .send({ access_token: 'valid_token' })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('id', '106458953461566')
          expect(res).to.have.header('x-auth-token')
          done()
        })
    })
  })

  describe('Get User profile', () => {
    test('returns the profile if JWT token is present and valid', done => {
      const token = createToken({ id: 106458953461566 })
      Users.put(106458953461566, {
        id: '106458953461566',
        name: 'Name',
        email: 'Email',
        gender: 'Gender',
        birthday: 'Birthday',
        facebookProvider: {}
      })

      chai
        .request(server)
        .get('/users/106458953461566')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('id', '106458953461566')
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
  })

  describe('Put User profile', () => {
    test('sets the user profile if JWT token is present and valid', done => {
      debugger
      const token = createToken({ id: 106458953461566 })
      const user = {
        id: '106458953461566',
        name: 'Name',
        email: 'Email',
        gender: 'Gender',
        birthday: 'Birthday',
        facebookProvider: {}
      }

      Users.put(106458953461566, user)

      chai
        .request(server)
        .put('/users/106458953461566')
        .send({ ...user, name: 'Olivia' })
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
  })

  afterAll(done => server.close(done))
})
