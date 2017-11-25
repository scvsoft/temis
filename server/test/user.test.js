import chai, { expect } from 'chai'
import chaid from 'chaid'
import dotenv from 'dotenv'
import getUsersModel from '../src/models/user'
import getMongoose from '../src/models/mongoose'

dotenv.config()
process.env.MONGODB_DBNAME = 'temis-test'
const mongoose = getMongoose()
const { getUser, getUserByFacebookId, putUser } = getUsersModel(mongoose)
let newUserId

chai.use(chaid)

describe('User', () => {
  beforeEach(async () => {
    mongoose.connection.dropDatabase()

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
    newUserId = newUser._id
  })

  describe('getUser', () => {
    test('returns an existing user', async done => {
      const rod = await getUser(newUserId)
      expect(rod)
        .to.have.property('_id')
        .to.be.id(mongoose.Types.ObjectId(newUserId))
      expect(rod).to.have.property('name', 'Rod')
      done()
    })

    test('returns null if the user does not exists', async done => {
      const user = await getUser('507f1f77bcf86cd799439012')
      // eslint-disable-next-line
      expect(user).to.be.null
      done()
    })
  })

  describe('putUser', () => {
    test('creates a new user', async done => {
      const newUser = await putUser({
        name: 'Olivia',
        email: 'yyy@gmail.com',
        birthday: '11/23/2017',
        gender: 'female',
        facebookProvider: {
          id: 1001,
          token: 'token'
        }
      })
      expect(newUser).to.have.property('_id')
      expect(newUser).to.have.property('name', 'Olivia')
      done()
    })

    test('updates an existing user', async done => {
      const updatedUser = await putUser(
        {
          name: 'Olivia',
          email: 'yyy@gmail.com',
          birthday: '11/23/2017',
          gender: 'female',
          facebookProvider: {
            id: 1001,
            token: 'token'
          }
        },
        newUserId
      )

      expect(updatedUser)
        .to.have.property('_id')
        .to.be.id(mongoose.Types.ObjectId(newUserId))
      expect(updatedUser).to.have.property('name', 'Olivia')
      done()
    })
  })

  describe('getUserByFacebookId', () => {
    test('returns an existing user', async done => {
      const rod = await getUserByFacebookId('106458953461566')
      expect(rod)
        .to.have.property('_id')
        .to.be.id(mongoose.Types.ObjectId(newUserId))
      expect(rod).to.have.property('name', 'Rod')
      done()
    })

    test('returns null if the user does not exists', async done => {
      const user = await getUserByFacebookId(1002)
      // eslint-disable-next-line
      expect(user).to.be.null
      done()
    })
  })

  afterAll(done => mongoose.connection.close(done))
})
