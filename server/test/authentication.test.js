import nock from 'nock'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import chaid from 'chaid'
import http from 'http'
import dotenv from 'dotenv'
import createApp from '../src/app'
import getUsersModel from '../src/models/user'
import getMongoose from '../src/models/mongoose'

// specific test settings
dotenv.config()
process.env.MONGODB_DBNAME = 'temis-test'

const mongoose = getMongoose()
const { putUser } = getUsersModel(mongoose)

const app = createApp()
const server = http.createServer(app)
chai.use(chaiHttp)
chai.use(chaid)

describe('Authentication', () => {
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
      await putUser({
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

  afterAll(done => {
    mongoose.connection.close(done)
    server.close(done)
  })
})
