import mongoose from 'mongoose'

let client

export default () => {
  if (!client) {
    // Use native promises
    mongoose.Promise = global.Promise
    mongoose.connect(
      `mongodb://${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}`,
      {
        useMongoClient: true
      }
    )
    mongoose.connection.on(
      'error',
      console.error.bind(console, 'DB connection failed', arguments)
    )
    mongoose.connection.once(
      'open',
      console.log.bind(console, 'Connected to DB')
    )

    client = mongoose
  }

  return client
}
