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
    return User.findByIdAndUpdate(
      id || mongoose.Types.ObjectId(),
      userProperties,
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }
    )
  }

  return { getUser, getUserByFacebookId, putUser }
}
