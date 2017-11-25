import express from 'express'
import reportsControllerBuilder from '../controllers/reports'

export default () => {
  const router = express.Router()

  const { get, post } = reportsControllerBuilder()

  router.get('/:reportId', get)
  router.post('/', post)

  return router
}
