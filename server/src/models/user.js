import { userSchema } from './user.schema'

// TODO: Abstract this, it's similar to the Report model
export default mongoose => {
  const User = mongoose.model('User', userSchema)

  const getUser = id => {
    return User.findById(id)
  }

  const getUserByFacebookId = facebookId => {
    return User.findOne({ 'facebookProvider.id': facebookId })
  }

  const putUser = async (userProperties, id) => {
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

  return { getUser, getUserByFacebookId, putUser }
}
