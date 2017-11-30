import chai, { expect } from 'chai'
import chaid from 'chaid'
import dotenv from 'dotenv'
import getMongoose from '../../src/models/mongoose'
import getUsersModel from '../../src/models/user'
import getReportsModel from '../../src/models/report'
import fixture from '../fixtures/reports'
import moment from 'moment'

chai.use(chaid)

describe('Report', () => {
  let mongoose
  let userModel, reportModel

  beforeAll(() => {
    dotenv.config()
    process.env.MONGODB_DBNAME = 'temis-test'

    mongoose = getMongoose()
    userModel = getUsersModel(mongoose)
    reportModel = getReportsModel(mongoose)
  })

  let newReportId
  let newUserId

  const reportProperties = {
    description: 'My hand got stuck in the hand-dryer!',
    location: [40.860941, -73.898504]
  }

  beforeEach(async () => {
    await mongoose.connection.dropDatabase()

    const newUser = await userModel.putUser({
      name: 'Rod',
      email: 'ppp@gmail.com',
      birthday: '11/23/2017',
      gender: 'male',
      facebookProvider: {
        id: '106458953461566',
        token: 'token'
      }
    })

    newUserId = newUser._id

    reportProperties.user = newUserId

    const newReport = await reportModel.putReport(reportProperties)

    newReportId = newReport._id
  })

  describe('getReport', () => {
    test('returns an existing report', async done => {
      const report = await reportModel.getReport(newReportId)
      expect(report)
        .to.have.property('_id')
        .to.be.id(mongoose.Types.ObjectId(newReportId))
      expect(report)
        .to.have.property('location')
        .to.be.an('array')
        .to.have.lengthOf(2)
      done()
    })

    test('returns an existing report and expands user', async done => {
      const report = await reportModel.getReport(newReportId, 'user')
      expect(report)
        .to.have.property('_id')
        .to.be.id(mongoose.Types.ObjectId(newReportId))
      expect(report)
        .to.have.property('user')
        .to.have.property('name', 'Rod')
      expect(report)
        .to.have.property('location')
        .to.be.an('array')
        .to.have.lengthOf(2)
      done()
    })
  })

  describe('putReport', () => {
    test('creates a new report', async done => {
      const newReport = await reportModel.putReport({
        ...reportProperties,
        description: 'It happened again'
      })

      expect(newReport).to.have.property('_id')
      expect(newReport).to.have.property('description', 'It happened again')
      done()
    })

    test('updates an existing report', async done => {
      const updatedReport = await reportModel.putReport(
        {
          ...reportProperties,
          description: 'Please help!'
        },
        newReportId
      )

      expect(updatedReport).to.have.property('_id')
      expect(updatedReport).to.have.property('description', 'Please help!')
      done()
    })

    test('fails with missing required fields', async done => {
      try {
        await reportModel.putReport({
          date: Date.now
        })
      } catch (err) {
        expect(err.errors).to.have.property('date')
        expect(err.errors).to.have.property('description')
        expect(err.errors).to.have.property('user')
        done()
      }
    })
  })

  describe('findWithinBounds', () => {
    test('returns reports inside the boundaries', async done => {
      for (const report of fixture) {
        // TODO: do in parallel (maybe change model to accept multiple reports)
        await reportModel.putReport({ ...report, user: newUserId })
      }

      const bounds = {
        lower: [-34.616147, -58.498758],
        upper: [-34.551686, -58.419478]
      }
      const reports = await reportModel.findWithinBounds(bounds)
      expect(reports).to.have.lengthOf(5)
      done()
    })

    test('returns reports inside the boundaries filtering by start and end date', async done => {
      for (const report of fixture) {
        // TODO: do in parallel (maybe change model to accept multiple reports)
        await reportModel.putReport({ ...report, user: newUserId })
      }

      const bounds = {
        lower: [-34.616147, -58.498758],
        upper: [-34.551686, -58.419478]
      }
      const startDate = moment().subtract(25, 'days')
      const endDate = moment().subtract(6, 'hours')
      const reports = await reportModel.findWithinBounds(bounds, {
        startDate,
        endDate
      })
      expect(reports).to.have.lengthOf(3)
      done()
    })
  })

  describe('getSummary', () => {
    test('get summary for reports', async done => {
      // the beforeEach creates a male user, create a female for the stats
      const femaleUser = await userModel.putUser({
        name: 'Olivia',
        email: 'oli@gmail.com',
        birthday: '11/23/2017',
        gender: 'female',
        facebookProvider: {
          id: '106458953461566',
          token: 'token'
        }
      })
      // first half male
      for (let i = 0; i < fixture.length / 2; i++) {
        await reportModel.putReport({ ...fixture[i], user: newUserId })
      }
      // second half female
      for (let i = fixture.length / 2; i < fixture.length; i++) {
        await reportModel.putReport({ ...fixture[i], user: femaleUser._id })
      }
      const bounds = {
        lower: [-34.616147, -58.498758],
        upper: [-34.551686, -58.419478]
      }
      const summary = await reportModel.getSummary(bounds, 1)
      const expectedSummary = {
        genderStats: { male: 3, female: 2 },
        clusters: [
          { point: [-34.565409, -58.465604], total: 2 },
          { point: [-34.569548, -58.427175], total: 1 },
          { point: [-34.584779, -58.452485], total: 1 },
          { point: [-34.587916, -58.467464], total: 1 }
        ]
      }

      expect(summary).to.deep.equal(expectedSummary)
      done()
    })
  })

  afterAll(done => mongoose.connection.close(done))
})
