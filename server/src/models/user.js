import { userSchema } from './user.schema'

export default mongoose => {
  const User = mongoose.model('User', userSchema)

  const getUser = id => {
    return User.findById(id)
  }

  const getUserByFacebookId = facebookId => {
    return User.findOne({ 'facebookProvider.id': facebookId })
  }

  const putUser = (userProperties, id) => {
    if (id) {
      return User.findByIdAndUpdate(id, userProperties, { new: true })
    } else {
      return User.create(userProperties)
    }
  }

  return { getUser, getUserByFacebookId, putUser }
}
