import '../../src/bootstrap'
import chai, { expect } from 'chai'
import chaid from 'chaid'
import mongoose from 'mongoose'
import {
  getUser,
  putUser,
  getUserByFacebookId,
  normalizeGender
} from '../../src/models/user'

chai.use(chaid)

describe('User', () => {
  let newUserId

  beforeAll(() => {
    process.env.MONGODB_DBNAME = 'temis-test'
  })

  beforeEach(async () => {
    await mongoose.connection.dropDatabase()

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
          anonymous: true,
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
      expect(updatedUser).to.have.property('gender', 'female')
      expect(updatedUser).to.have.property('anonymous', true)
      done()
    })

    test('fails if gender has not a valid value', async done => {
      try {
        await putUser({
          name: 'Olivia',
          email: 'olivia@gmail.com',
          birthday: '11/23/2017',
          gender: 'unknown',
          facebookProvider: {
            id: 1001,
            token: 'token'
          }
        })
      } catch (err) {
        expect(err.errors).to.have.property('gender')
        done()
      }
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

  describe('normalizeGender', () => {
    test('normalizes an unknown gender', () => {
      expect(normalizeGender('unknown')).to.equal('other')
    })

    test('returns the same gender as it is a valid one', () => {
      expect(normalizeGender('female')).to.equal('female')
    })
  })

  afterAll(done => mongoose.connection.close(done))
})
