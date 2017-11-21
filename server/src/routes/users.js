import express from 'express'
import { getUser, putUser } from '../controllers/users'

export default () => {
  const router = express.Router()

  router.get('/:userId', getUser)
  router.put('/:userId', putUser)

  return router
}
