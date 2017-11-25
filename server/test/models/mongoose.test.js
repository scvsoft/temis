import dotenv from 'dotenv'
import getMongoose from '../../src/models/mongoose'

describe('Mongoose', () => {
  let mongoose

  beforeAll(() => {
    dotenv.config()
    process.env.MONGODB_DBNAME = 'temis-test'

    mongoose = getMongoose()
  })

  describe('Connection', () => {
    test('should connect to the mongodb instance', done => {
      mongoose.connection.on('open', done)
    })
  })

  afterAll(done => mongoose.connection.close(done))
})
