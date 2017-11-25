import dotenv from 'dotenv'
import getMongoose from '../src/models/mongoose'

dotenv.config()
process.env.MONGODB_DBNAME = 'temis-test'

const mongoose = getMongoose()

describe('Mongoose', () => {
  describe('Connection', () => {
    test('should connect to the mongodb instance', done => {
      mongoose.connection.on('open', done)
    })
  })

  afterAll(done => mongoose.connection.close(done))
})
