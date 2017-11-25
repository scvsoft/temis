import chai, { expect } from 'chai'
import chaid from 'chaid'
import dotenv from 'dotenv'
import getMongoose from '../../src/models/mongoose'
import getUsersModel from '../../src/models/user'
import getReportsModel from '../../src/models/report'

dotenv.config()
process.env.MONGODB_DBNAME = 'temis-test'
const mongoose = getMongoose()
const { putUser } = getUsersModel(mongoose)
const { getReport, putReport } = getReportsModel(mongoose)

chai.use(chaid)

describe('Report', () => {
  let newReportId

  const reportProperties = {
    description: 'My hand got stuck in the hand-dryer!',
    location: [-34.60235, -58.454232]
  }

  beforeEach(async () => {
    mongoose.connection.dropDatabase()

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

    reportProperties.user = newUser._id

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
        done()
      }
    })
  })

  afterAll(done => mongoose.connection.close(done))
})
