import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import chaid from 'chaid'
import http from 'http'
import dotenv from 'dotenv'
import createApp from '../src/app'
import authenticationControllerBuilder from '../src/controllers/authentication'
import getUsersModel from '../src/models/user'
import getMongoose from '../src/models/mongoose'

// specific test settings
dotenv.config()
process.env.MONGODB_DBNAME = 'temis-test'

const mongoose = getMongoose()
const { putUser } = getUsersModel(mongoose)
const { createToken } = authenticationControllerBuilder()

const app = createApp()
const server = http.createServer(app)
chai.use(chaiHttp)
chai.use(chaid)

describe('Users endpoint', () => {
  beforeEach(() => {
    mongoose.connection.dropDatabase()
    process.env.JWT_EXPIRATION = '2h'
  })

  describe('Get User profile', () => {
    test('returns the profile if JWT token is present and valid', async done => {
      const newUser = await putUser({
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
      const newUser = await putUser({
        name: 'Rod',
        email: 'xxx@gmail.com',
        birthday: '11/23/2017',
        gender: 'male',
        facebookProvider: {
          id: '106458953461565',
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
      const newUser = await putUser(userProperties)
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
      const newUser = await putUser(userProperties)
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
