import '../../src/bootstrap'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import chaid from 'chaid'
import http from 'http'
import mongoose from 'mongoose'
import app from '../../src/app'
import { createToken } from '../../src/controllers/authentication'
import { putUser } from '../../src/models/user'
import { putReport } from '../../src/models/report'
import fixture from '../fixtures/reports'

chai.use(chaiHttp)
chai.use(chaid)

describe('Server', () => {
  let token
  let userId
  let server

  beforeAll(() => {
    // specific test settings
    process.env.MONGODB_DBNAME = 'temis-test'
    process.env.JWT_EXPIRATION = '2h'

    server = http.createServer(app)
  })

  beforeEach(async () => {
    await mongoose.connection.dropDatabase()

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

  describe('Get Report summary', () => {
    test('returns the summary for the loaded reports', async done => {
      for (const report of fixture) {
        // TODO: do in parallel (maybe change model to accept multiple reports)
        await putReport({ ...report, user: userId })
      }

      chai
        .request(server)
        .get(
          '/reports/summary?bounds=-34.616147,-58.498758,-34.551686,-58.419478&radius=1'
        )
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('genderStats')
          expect(res.body).to.have.property('frequencyStats')
          expect(res.body).to.have.property('clusters')
          done()
        })
    })
  })

  afterAll(done => {
    mongoose.connection.close(done)
    server.close(done)
  })
})
