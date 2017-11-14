import Users from '../models/user'

export const getUser = (req, res) => {
  if (req.params.userId !== req.user.id) {
    res.status(401)
  } else {
    res.status(200).json(req.user)
  }
}

export const putUser = (req, res) => {
  if (req.params.userId !== req.user.id) {
    res.status(401)
  } else {
    const user = {
      id: req.user.id,
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      birthday: req.body.birthday
    }
    Users.put(req.user.id, user)
    res.status(200).json(user)
  }
}
