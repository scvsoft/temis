import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import chaid from 'chaid'
import http from 'http'
import dotenv from 'dotenv'
import createApp from '../../src/app'
import authenticationControllerBuilder from '../../src/controllers/authentication'
import getUsersModel from '../../src/models/user'
import getReportsModel from '../../src/models/report'
import getMongoose from '../../src/models/mongoose'

// specific test settings
dotenv.config()
process.env.MONGODB_DBNAME = 'temis-test'

const mongoose = getMongoose()
const { putUser } = getUsersModel(mongoose)
const { putReport } = getReportsModel(mongoose)
const { createToken } = authenticationControllerBuilder()

const app = createApp()
const server = http.createServer(app)
chai.use(chaiHttp)
chai.use(chaid)

describe('Server', () => {
  let token
  let userId

  beforeEach(async () => {
    mongoose.connection.dropDatabase()

    const user = await putUser({
      name: 'Rod',
      email: 'abc@gmail.com',
      birthday: '11/23/2017',
      gender: 'male',
      facebookProvider: {
        id: '106458953461566',
        token: 'token'
      }
    })

    userId = user._id

    token = createToken({ id: userId })
  })

  describe('Get Report', () => {
    test('returns the report', async done => {
      const reportProperties = {
        description: 'My hand got stuck in the hand-dryer!',
        location: [-34.60235, -58.454232],
        user: userId
      }

      const newReport = await putReport(reportProperties)

      chai
        .request(server)
        .get(`/reports/${newReport._id}`)
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body)
            .to.have.property('_id')
            .to.be.id(mongoose.Types.ObjectId(newReport._id))
          expect(res.body).to.have.property(
            'description',
            'My hand got stuck in the hand-dryer!'
          )
          done()
        })
    })

    test('returns the report with the expanded user', async done => {
      const reportProperties = {
        description: 'My hand got stuck in the hand-dryer!',
        location: [-34.60235, -58.454232],
        user: userId
      }

      const newReport = await putReport(reportProperties)

      chai
        .request(server)
        .get(`/reports/${newReport._id}?expand=user`)
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body)
            .to.have.property('_id')
            .to.be.id(mongoose.Types.ObjectId(newReport._id))
          expect(res.body).to.have.property(
            'description',
            'My hand got stuck in the hand-dryer!'
          )
          expect(res.body)
            .to.have.property('user')
            .to.have.property('name', 'Rod')
          done()
        })
    })

    test('returns 404 if the report does not exists', async done => {
      chai
        .request(server)
        .get('/reports/1')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
    })
  })

  describe('Post Report', () => {
    test('creates a report', async done => {
      const reportProperties = {
        description: 'My hand got stuck in the hand-dryer!',
        location: [-34.60235, -58.454232]
      }

      chai
        .request(server)
        .post('/reports')
        .send(reportProperties)
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('_id')
          done()
        })
    })

    test('fails to create a report with missing required fields', async done => {
      const reportProperties = {
        location: [-34.60235, -58.454232]
      }

      chai
        .request(server)
        .post('/reports')
        .send(reportProperties)
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('errors')
          done()
        })
    })
  })

  afterAll(done => {
    mongoose.connection.close(done)
    server.close(done)
  })
})
