import { putUser } from '../models/user'

export const get = (req, res) => {
  if (req.params.userId !== req.auth.id) {
    res.status(401).json('The user is not authorized to access this resource')
  } else {
    res.status(200).json(req.user)
  }
}

export const put = async (req, res) => {
  if (req.params.userId !== req.auth.id) {
    res.status(401).json('The user is not authorized to access this resource')
  } else {
    try {
      const user = await putUser(req.body, req.auth.id)
      res.status(200).json(user)
    } catch (err) {
      res.status(400).json(err)
    }
  }
}
