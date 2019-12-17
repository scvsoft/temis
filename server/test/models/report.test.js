import '../../src/bootstrap'
import chai, { expect } from 'chai'
import mongoose from 'mongoose'
import chaid from 'chaid'
import { putUser } from '../../src/models/user'
import {
  putReport,
  getReport,
  getSummary,
  getFrequencyStats,
  findWithinBounds
} from '../../src/models/report'
import fixture from '../fixtures/reports'
import moment from 'moment'

chai.use(chaid)

describe('Report', () => {
  beforeAll(() => {
    process.env.MONGODB_DBNAME = 'temis-test'
  })

  let newReportId
  let newUserId

  const reportProperties = {
    description: 'My hand got stuck in the hand-dryer!',
    location: [40.860941, -73.898504]
  }

  beforeEach(async () => {
    await mongoose.connection.dropDatabase()

    const newUser = await putUser({
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

    const newReport = await putReport(reportProperties)

    newReportId = newReport._id
  })

  describe('getReport', () => {
    test('returns an existing report', async done => {
      const report = await getReport(newReportId)
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
      const report = await getReport(newReportId, 'user')
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
      const newReport = await putReport({
        ...reportProperties,
        description: 'It happened again'
      })

      expect(newReport).to.have.property('_id')
      expect(newReport).to.have.property('description', 'It happened again')
      done()
    })

    test('updates an existing report', async done => {
      const updatedReport = await putReport(
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
        await putReport({
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

  describe('getFrequencyStats', () => {
    test('returns the frequency in days', () => {
      const minDate = moment().subtract(5, 'days')
      const maxDate = moment()
      const frequencyStats = getFrequencyStats(10, minDate, maxDate)
      expect(frequencyStats).to.have.property('unit', 'days')
      expect(frequencyStats.frequency).to.equal(2)
    })

    test('returns the frequency in weeks', () => {
      const minDate = moment().subtract(8, 'days')
      const maxDate = moment()
      const frequencyStats = getFrequencyStats(5, minDate, maxDate)
      expect(frequencyStats).to.have.property('unit', 'weeks')
      expect(frequencyStats.frequency).to.equal(5)
    })

    test('returns the frequency in weeks', () => {
      const minDate = moment().subtract(3, 'weeks')
      const maxDate = moment()
      const frequencyStats = getFrequencyStats(57, minDate, maxDate)
      expect(frequencyStats).to.have.property('unit', 'weeks')
      expect(frequencyStats.frequency).to.equal(19)
    })
  })

  describe('findWithinBounds', () => {
    test('returns reports inside the boundaries', async done => {
      for (const report of fixture) {
        // TODO: do in parallel (maybe change model to accept multiple reports)
        await putReport({ ...report, user: newUserId })
      }

      const bounds = {
        lower: [-34.616147, -58.498758],
        upper: [-34.551686, -58.419478]
      }
      const reports = await findWithinBounds(bounds)
      expect(reports).to.have.lengthOf(5)
      done()
    })

    test('returns reports inside the boundaries filtering by start and end date', async done => {
      for (const report of fixture) {
        // TODO: do in parallel (maybe change model to accept multiple reports)
        await putReport({ ...report, user: newUserId })
      }

      const bounds = {
        lower: [-34.616147, -58.498758],
        upper: [-34.551686, -58.419478]
      }
      const startDate = moment().subtract(25, 'days')
      const endDate = moment().subtract(6, 'hours')
      const reports = await findWithinBounds(bounds, {
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
      const femaleUser = await putUser({
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
        await putReport({ ...fixture[i], user: newUserId })
      }
      // second half female
      for (let i = fixture.length / 2; i < fixture.length; i++) {
        await putReport({ ...fixture[i], user: femaleUser._id })
      }
      const bounds = {
        lower: [-34.616147, -58.498758],
        upper: [-34.551686, -58.419478]
      }
      const summary = await getSummary(bounds, 1)
      const expectedSummary = {
        genderStats: { male: 3, female: 2 },
        frequencyStats: { frequency: 5, unit: 'months' },
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
