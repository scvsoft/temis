import express from 'express'
import usersControllerBuilder from '../controllers/users'

export default () => {
  const router = express.Router()

  const { get, put } = usersControllerBuilder()

  router.get('/:userId', get)
  router.put('/:userId', put)

  return router
}
