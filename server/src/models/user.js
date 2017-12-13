import mongoose from 'mongoose'
import { userSchema, genders } from './user.schema'

// TODO: Abstract this, it's similar to the Report model

const User = mongoose.model('User', userSchema)

export const getUser = id => {
  return User.findById(id)
}

export const getUserByFacebookId = facebookId => {
  return User.findOne({ 'facebookProvider.id': facebookId })
}

export const putUser = async (userProperties, id) => {
  let user

  try {
    if (id) {
      user = await getUser(id)
      user.set(userProperties)
    } else {
      user = new User(userProperties)
    }
  } catch (err) {
    return err
  }

  return user.save()
}

export const normalizeGender = gender => {
  if (!genders.includes(gender)) {
    return genders[0]
  }
  return gender
}
